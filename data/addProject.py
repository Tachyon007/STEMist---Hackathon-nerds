import pandas as pd # Import pandas package

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

#addProject("Title", "Description", "[Tags,Tags,Tags]")
addProject("randy randy", "description stuffs ", ["tag", "tag", "tag","racism"])

# projects.to_sql()