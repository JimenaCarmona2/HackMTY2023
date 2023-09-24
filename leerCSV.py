import os
import csv
from softtek_llm.chatbot import Chatbot
from softtek_llm.models import OpenAI
from softtek_llm.cache import Cache
from softtek_llm.vectorStores import PineconeVectorStore
from softtek_llm.embeddings import OpenAIEmbeddings
from softtek_llm.schemas import Filter
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if OPENAI_API_KEY is None:
    raise ValueError("OPENAI_API_KEY not found in .env file")

OPENAI_API_BASE = os.getenv("OPENAI_API_BASE")
if OPENAI_API_BASE is None:
    raise ValueError("OPENAI_API_BASE not found in .env file")

OPENAI_EMBEDDINGS_MODEL_NAME = os.getenv("OPENAI_EMBEDDINGS_MODEL_NAME")
if OPENAI_EMBEDDINGS_MODEL_NAME is None:
    raise ValueError("OPENAI_EMBEDDINGS_MODEL_NAME not found in .env file")

OPENAI_CHAT_MODEL_NAME = os.getenv("OPENAI_CHAT_MODEL_NAME")
if OPENAI_CHAT_MODEL_NAME is None:
    raise ValueError("OPENAI_CHAT_MODEL_NAME not found in .env file")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
if PINECONE_API_KEY is None:
    raise ValueError("PINECONE_API_KEY not found in .env file")

PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT")
if PINECONE_ENVIRONMENT is None:
    raise ValueError("PINECONE_ENVIRONMENT not found in .env file")

PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
if PINECONE_INDEX_NAME is None:
    raise ValueError("PINECONE_INDEX_NAME not found in .env file")

vector_store = PineconeVectorStore(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENVIRONMENT,
    index_name=PINECONE_INDEX_NAME,
)

embeddings_model = OpenAIEmbeddings(
    api_key=OPENAI_API_KEY,
    model_name=OPENAI_EMBEDDINGS_MODEL_NAME,
    api_type="azure",
    api_base=OPENAI_API_BASE,
)

cache = Cache(
    vector_store=vector_store,
    embeddings_model=embeddings_model,
)

model = OpenAI(
    api_key=OPENAI_API_KEY,
    model_name=OPENAI_CHAT_MODEL_NAME,
    api_type="azure",
    api_base=OPENAI_API_BASE,
    verbose=False,
)

filters = [
    Filter(
        type="ALLOW",
        case="Make sure, REALLY SURE, that you are reading every column in the file and that you compare each one of it CORRECTLY if asked.",
    )
]

chatbot = Chatbot(
    model=model,
    description="You are a very helpful and polite chatbot",
    filters=filters,
    cache=cache,
    verbose=False,
)

#método para generar una prompt y regresar la respuesta
#input: prompt en formato string
#output: respuesta de gpt en formato string
def get_answer(inputPrompt):
    while True:
        try:
            response = chatbot.chat(
                prompt= inputPrompt,
                print_cache_score=False,
            )
            break
        except:
            pass
    respuesta = response.message.content

    return respuesta

#método para leer un csv, y hacer un análisis con gpt
#input: un archivo csv
#output: prompt para gpt
def generate_prompt_from_csv(file_path):
    # Read the CSV file
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        data = list(csv_reader)

    # Generate a prompt based on the CSV data
    prompt = f"Here is a CSV file:\n\n"
    
    for row in data[:]:  # Display the first 5 rows as an example
        prompt += ', '.join(row) + '\n'
    
    #prompt += f"Obtain the min and max of each column and based on that information give a general analysis of the dataset, and in a new paragraph give quick tips to reduce the emitions of lead, nitrox"
    #return prompt

    save_information = {
        "source_file" : file_path,
        "number_of_row": len(data),
        "column_names": data[0],
    }

    #Seccion para aumentar información
    prompt += f"""\nThe regulation NOM-098-SEMARNAT-2002, Environmental Protection - Waste incineration, specifications of
operation and pollutant emission limits. It is a regulation by the country of Mexico that must be complied with for those companies that process metals. In which it is stipulated that there is a maximum amount of milligram per cubic meter of microminarals that the emitted gases can have, these being the minerals and their respective quantities: lead with 0.2, nitrogen oxides with 150.00, total hydrocarbons with 70.00 and dioxins with furans with 0.2. If these amounts are exceeded, the company is not complying with the regulations and will have legal problems in the future. The frequency of measurement of lead is 4 times a year, nitrogen oxide 3, as well as total hydrocarbons and dioxins with funranes are once.\n"""
    for key, value in save_information.items():
        prompt += f"- {key}: {value}\n"

    
    prompt += f"\nObtain the min, max, mean, and range of each column and based on that information give a general analysis of the dataset, and in a new paragraph give quick tips to reduce the emitions of lead, nitrox"
    return prompt


print(get_answer(generate_prompt_from_csv("contaminantes.csv")))