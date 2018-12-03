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
const moment = require('moment');

const searchLicenses = async filters =>
    await elasticSearchModule.elasticSearchClient.search({
        index: '47',
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                "currentPeriod.renewalEndDate": moment().format('MM/DD/YYYY')
                            }
                        },

                        {
                            constant_score: {
                                filter: {
                                    terms: {
                                        "currentPeriod.licenseStatus": RENEWABLE_STATUS_ELASTIC
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

    const esQueries = await elasticSearchModule.searchLicenses(boardId);
    if (esQueries.hits.total == 0 || !esQueries) {
        return;
    }
    return esQueries.hits.hits;
}

const elasticSearchModule = {
    searchLicensesGroupedByBoard,
    searchLicenses,
    elasticSearchClient
}


module.exports = elasticSearchModule