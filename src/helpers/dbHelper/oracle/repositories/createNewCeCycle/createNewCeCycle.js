require('dotenv').config();
const {
  USER_LOGING,
  CAME_FROM
} = process.env;

 const init= (knex) => {
    createNewCeCycle.knex = knex;
  }
  
  const searchBoards = async () => {
    try {
      const results = await createNewCeCycle.knex
      .column('BOARD.ID_BOARD', {frecuency:'CD_FREQ_CHECK_LIC_STATUS'})
      .select()
      .from('IMPORT_BOARD_FILE_SETTINGS')
      .innerJoin('BOARD', 'BOARD.ID_BOARD', 'IMPORT_BOARD_FILE_SETTINGS.ID_BOARD')
      .whereNotNull('CD_FREQ_CHECK_LIC_STATUS');
      return results;
    } catch (error) {
      console.error(error.message);
    }
  }

  const createNewCeCycleFromPrior = async idLicensePeriod => {
    try {
      const results = await createNewCeCycle.knex
        .raw(` 
            begin
            Pkg_Bg_Upgrade_License_TN.create_new_ce_cycle_from_prior(pid_license_period_current => '${idLicensePeriod}',
                                                                    pid_userloged => '${USER_LOGING}',
                                                                    pcd_came_from => ${CAME_FROM});
           commit; 
          end;
            `);
      return results;
    } catch (error) {
      console.error(error.message);
    }
  }


  
const createNewCeCycle = {
  init,
  searchBoards,
  createNewCeCycleFromPrior
}

module.exports = {
  createNewCeCycle
};
