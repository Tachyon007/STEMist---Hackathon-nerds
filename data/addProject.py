import pandas as pd # Import pandas package

# Convert json to csv
# projects = pd.read_json('data\oldProjects.json')
# projects.to_json('data/projects.json', orient='records')

def addProject(title, desc, tags):
    entry = {"Title":title, "Description":desc, "Tags":tags}
    df_projects = pd.read_json('data/projects.json')
    print(df_projects)
addProject("filler", "filer", "filler")
    
    

# projects.to_sql()