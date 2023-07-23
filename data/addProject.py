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
tags_string = """api
map
recommendation
machine learning
analysis
assistance
website
backend
frontend"""
tags_list = tags_string.split("\n") # Use data_list to format 'Tags'

# TEMPLATE ==> addProject("Title", "Description", "[Tags,Tags,Tags]")
addProject("food distribution route / world hunger tool", "create a tool that looks at major producers of grains and other base foods and try to optimally route supplies to the nearest place where hunger is a prevelant issue.", tags_list)