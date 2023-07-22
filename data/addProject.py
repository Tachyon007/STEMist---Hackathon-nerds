import pandas as pd # Import pandas package

# Add project with passed paramaters
def addProject(title, desc, tags):
    # Uppercase
    title = title.title()
    desc = desc.capitalize()
    tags = [s.title() for s in tags]
    # Create new entry (dataframe)
    df_entry = pd.DataFrame([{"Title":title, "Description":desc, "Tags":tags}])
    
    df_proj = pd.read_json('data/projects.json') # dataframe
    
    # Check if proj with same title name already exists
    if title in df_proj["Title"].values:
        df_proj = df_proj.drop( df_proj.loc[df_proj['Title']==title].index ) # Drop existing project
    
    # Combine existing df and entry_df
    df_proj = pd.concat([df_proj, df_entry], ignore_index=True)
    
    df_proj.to_json('data/projects.json', orient='records')
# Remove project with same 'title' passed
def removeProject(title):
    title = title.title()
    df_proj = pd.read_json('data/projects.json') # dataframe
    
    # Check if proj with same title name already exists
    if title in df_proj["Title"].values:
        df_proj = df_proj.drop( df_proj.loc[df_proj['Title']==title].index ) # Drop existing project
        df_proj.to_json('data/projects.json', orient='records')
    else:
        print("ERROR:>> ",title, "NOT FOUND")


#____________________________MAIN _______________________________#
tags_string = """AI
Robotics
Blockchain
Cybersecurity
Machine Learning
Data Analysis
Natural Language Processing
Game Development
Virtual Reality
Augmented Reality
Web Development
Mobile Apps
Cloud Computing
Big Data
Internet of Things (IoT)
Cryptography
Databases
Algorithms
Neural Networks
Computer Vision
Bioinformatics
Chatbots
Parallel Computing
Data Mining
Genetic Algorithms
Computer Graphics
Quantum Computing
Network Security
Wearable Technology
Embedded Systems
Compiler Design
Artificial Life
Fuzzy Logic
Natural Computation
Gesture Recognition
Human-Computer Interaction (HCI)
Geographical Information Systems (GIS)
Computational Linguistics
Distributed Systems
Image Processing
Recommender Systems
Information Retrieval
Speech Recognition
Evolutionary Computation
Social Network Analysis
Internet Technologies
Operating Systems
Data Visualization
Semantic Web
E-commerce"""
tags_list = tags_string.split("\n") # Use data_list to format 'Tags'

# TEMPLATE ==> addProject("Title", "Description", "[Tags,Tags,Tags]")
addProject("randy randy", "description stuffs ", tags_list)

