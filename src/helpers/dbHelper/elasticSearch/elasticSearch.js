require('dotenv').config();
const elasticsearch = require("elasticsearch");
const moment = require('moment');

const {
    ELASTICSEARCH_URL,
    ELASTICSEARCH_USER,
    ELASTICSEARCH_PASSWORD,
    RENEWABLE_STATUS_ELASTIC,
    ELASTICSEARCH_BULK_LIMIT,
    ELASTICSEARCH_SCROLL

} = process.env;

const elasticSearchCredentials = {
    host: `${ELASTICSEARCH_URL}`
};

if (ELASTICSEARCH_USER && ELASTICSEARCH_PASSWORD) {
    elasticSearchCredentials.httpAuth = `${ELASTICSEARCH_USER}:${ELASTICSEARCH_PASSWORD}`;
}

const elasticSearchClient = new elasticsearch.Client(elasticSearchCredentials);
const searchLicenses = async (idBoard, filters) =>
    await elasticSearchModule.elasticSearchClient.search({
        index: idBoard,
        scroll: filters.scroll,
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
                                        "currentPeriod.licenseStatus": JSON.parse(RENEWABLE_STATUS_ELASTIC)
                                    }
                                }
                            }
                        }
                    ]

                }
            },
            size: filters.limit,
        }

    });

const scrollSearch = (scrollId) => {
    return elasticSearchModule.elasticSearchClient.scroll({
        scrollId: `${scrollId}`,
        scroll: ELASTICSEARCH_SCROLL
    })
}
const searchLicensesGroupedByBoard = async boardId => {
    try {
        let filters = {
            limit: ELASTICSEARCH_BULK_LIMIT,
            scroll: ELASTICSEARCH_SCROLL
        };
        const licenseResponse = await elasticSearchModule.searchLicenses(boardId, filters);
        if (licenseResponse.hits.total == 0 || !licenseResponse) {
            return;
        }
        let licenses = licenseResponse.hits.hits;
        let foundLicenses = [];
        let count = 0;

        while (count < licenseResponse.hits.total) {
            for (const license of licenses) {
                foundLicenses.push(license);
                count++;
            }

            //scroll to the next group of licenses
            const scrollResult = await elasticSearchModule.scrollSearch(licenseResponse._scroll_id);
            licenses = scrollResult.hits.hits;
        }

        return foundLicenses;

    } catch (error) {
        console.error(error)
    }
}

const elasticSearchModule = {
    searchLicensesGroupedByBoard,
    searchLicenses,
    elasticSearchClient,
    scrollSearch
}


module.exports = elasticSearchModule