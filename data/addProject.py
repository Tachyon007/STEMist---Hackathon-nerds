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
data_string = """Web scraping
Python
Data extraction
Data scraping
Online prices
E-commerce data
Data mining
BeautifulSoup
Requests
Parsing HTML
Price comparison
Data collection
Automation
Product prices
Data analysis
Data manipulation
Data cleaning
Data visualization
Website data
API integration
Price tracking
Data aggregation
Price monitoring
Web crawling
Data harvesting
Data processing
Data storage
CSV files
JSON format
Data presentation
Data insights
Online retailers
Price fluctuations
Historical data
Scrapy framework
Regular expressions
Data export
Data filtering
Data exploration
Data handling
Price alerts
Price prediction
Data accuracy
Data transformation
Data normalization
Data integration
Data validation
Price history
Data reporting
User-friendly interface"""
data_list = data_string.split("\n") # Use data_list to format 'Tags'

# TEMPLATE ==> addProject("Title", "Description", "[Tags,Tags,Tags]")
addProject("randy randy", "description stuffs ", data_list)