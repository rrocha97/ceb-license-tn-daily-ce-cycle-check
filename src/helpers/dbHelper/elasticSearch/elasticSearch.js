const {
    ELASTICSEARCH_URL,
    ELASTICSEARCH_USER,
    ELASTICSEARCH_PASSWORD,
    RENEWABLE_STATUS_ELASTIC
} = process.env;

const elasticSearchCredentials = {
    host: `${ELASTICSEARCH_URL}`
};

if (ELASTICSEARCH_USER && ELASTICSEARCH_PASSWORD) {
    elasticSearchCredentials.httpAuth = `${ELASTICSEARCH_USER}:${ELASTICSEARCH_PASSWORD}`;
}
const elasticsearch = require("elasticsearch");
const elasticSearchClient = new elasticsearch.Client(elasticSearchCredentials);

const searchLicenses = async filters =>
    await elasticSearchClient.search({
        index: '47',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                "currentPeriod.renewalEndDate": "12/31/2018"
                            }
                        },

                        {
                            constant_score: {
                                filter: {
                                    terms: {
                                        "currentPeriod.licenseStatus": ['ACTIVE']
                                    }
                                }
                            }
                        }
                    ]

                }
            }
        }
   
        });
    
    

const searchLicensesGroupedByBoard = async boardId => {
    
    const filters = { ids: [], boardId };
    const esQueries = await elasticSearchModule.searchLicenses(filters); 
    
    if (esQueries.length === 0) {
        return;
    }

    return  esQueries.hits.hits;
}


const elasticSearchModule = {
    searchLicensesGroupedByBoard,
    searchLicenses
}


module.exports = elasticSearchModule