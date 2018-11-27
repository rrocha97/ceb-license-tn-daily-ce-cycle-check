// const {
//     ELASTICSEARCH_URL,
//     ELASTICSEARCH_USER,
//     ELASTICSEARCH_PASSWORD,
// } = process.env;


// const elasticSearchCredentials = {
//     host: `${ELASTICSEARCH_URL}`
// };

// if (ELASTICSEARCH_USER && ELASTICSEARCH_PASSWORD) {
//     elasticSearchCredentials.httpAuth = `${ELASTICSEARCH_USER}:${ELASTICSEARCH_PASSWORD}`;
// }
// const elasticsearch = require("elasticsearch");
// const elasticSearchClient = new elasticsearch.Client(elasticSearchCredentials);

// const searchLicenses = filters =>
//     elasticSearchClient.search({
//         index: filters.boardId,
//         body: {
//             query: {
//                 constant_score: {
//                     filter: {
//                         terms: {
//                             id: filters.ids
//                         }
//                     }
//                 }
//             },
//             size: filters.ids.length
//         }
//     });
// const groupByBoard = licenses => {
//     const groupedLicenses = [];
//     const boardIds = licenses.map(licence => {
//         const { profession = {} } = licence;
//         const { board = {} } = profession;
//         return board.id;
//     });
//     const filteredBoardIds = boardIds.filter(
//         (boardId, index, arr) => index === arr.indexOf(boardId)
//     );
//     filteredBoardIds.map(boardId => {
//         const group = licenses
//             .filter(license => license.profession.board.id === boardId)
//             .map(license => license.pk_license);
//         groupedLicenses.push({ boardId, group });
//     });
//     return groupedLicenses;
// };


// const searchLicensesGroupedByBoard = async licensesGroupedByBoard => {
//     const esQueries = licensesGroupedByBoard.map(licenses => {
//         const filters = { ids: [...licenses.group], boardId: licenses.boardId };
//         return searchLicenses(filters);
//     });
//     if (esQueries.length === 0) {
//         return;
//     }
//     const esResult = await Promise.all(esQueries);
//     const hitsArray = esResult.map(result => result.hits.hits);
//     const esLicenses = [].concat(...hitsArray);
//     return esLicenses;
// }
