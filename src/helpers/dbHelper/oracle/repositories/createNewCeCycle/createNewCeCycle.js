require('dotenv').config();
const {
  RENEWABLE_STATUS_ORACLE
} = process.env;
const moment = require('moment');
const createNewCeCycle = {
  init: knex => {
    createNewCeCycle.knex = knex;
  },
  searchBoards: async () => {
    try {
      const results = await createNewCeCycle.knex
      .column('CD_BOARD', {frecuency:'CD_FREQ_CHECK_LIC_STATUS'})
      .select()
      .from('IMPORT_BOARD_FILE_SETTINGS')
      .innerJoin('BOARD', 'BOARD.ID_BOARD', 'IMPORT_BOARD_FILE_SETTINGS.ID_BOARD')
      .whereNotNull('CD_FREQ_CHECK_LIC_STATUS');
      return results;
    } catch (error) {
      console.error(error.message);
    }
  },

  createNewCeCycleFromPrior: async idLicensePeriod => {
    try {
      const results = await createNewCeCycle.knex
        .raw(` 
            begin
            Pkg_tn_daily_ce_cycle_check.create_new_ce_cycle_from_prior(pid_license_period_current => ${idLicensePeriod});
           commit; 
          end;
            `);
      return results;
    } catch (error) {
      console.error(error.message);
    }
  },


  searchLicenseExpToday: async (cdBoard) => {
    try {
      const results = await createNewCeCycle.knex
      .raw(`select L.id_user, L.dt_updated, seq_license_period_id.nextval id_license_period_new, cd_eval_ce_exp_date,lP.*
      from license l
      inner join license_period lp
        on lp.pk_license = l.pk_license
      inner join board b on b.id_board = l.id_board
      inner join profession p 
        on p.id_profession = l.id_profession
      where  dt_renewal_end= TO_DATE('${moment().format('MM/DD/YYYY')}', 'MM/DD/YYYY')
          and CD_BOARD = '${cdBoard}'
          and upper(CD_PRAES_LICENSE_STATUS) in ${RENEWABLE_STATUS_ORACLE}`);
        

      return results;
    } catch (error) {
      console.error(error.message);
    }
  },

  insertLicensePeriod: async lp => {
    try {
      const results = await createNewCeCycle.knex('LICENSE_PERIOD').insert({
        PK_LICENSE: lp.PK_LICENSE,
        ID_LICENSE_PERIOD: lp.ID_LICENSE_PERIOD_NEW,
        CD_PRAES_ACTIVITY_STATUS: lp.CD_PRAES_ACTIVITY_STATUS,
        CD_PRAES_LICENSE_STATUS: lp.CD_PRAES_LICENSE_STATUS,
        CD_SCENARIO: lp.CD_SCENARIO,
        DT_DOH_REPORTED: lp.DT_DOH_REPORTED,
        DT_RENEWAL_START_ORIGINAL: lp.DT_RENEWAL_START_ORIGINAL,
        DT_RENEWAL_START_DISPLAY: lp.DT_RENEWAL_START_DISPLAY,
        DT_LICENSE_STATUS_CHG: lp.DT_LICENSE_STATUS_CHG,
        DT_RENEWAL_START: lp.DT_RENEWAL_START,
        DT_RENEWAL_END: lp.DT_RENEWAL_END,
        DT_LICENSE_LAST_RENEWED: lp.DT_LICENSE_LAST_RENEWED,
        ID_ADDED: 99,
        DT_ADDED: lp.DT_ADDED
      });

      return results;
    } catch (error) {
      console.error(error.message);
    }
  },

  insertLicenseExpirationDateXref: async lp => {
    try {
      const results = await createNewCeCycle.knex('LICENSE_EXPIRATION_DATE_XREF').insert({
        PK_LICENSE: lp.PK_LICENSE,
        DT_RENEWAL_END: lp.DT_RENEWAL_END,
        ID_ADDED: 99,
        DT_ADDED: new Date(),
        CD_CAME_FROM : null
      });

      return results;
    } catch (error) {
      console.error(error.message);
    }
  },

  getCdScenariolp: async (idLicensePeriod) => {
    try {
      return await createNewCeCycle.knex.raw(`select pkg_scenario_api.cd_scenario(pid_license_period => ${idLicensePeriod} ) type from dual  `);
    } catch (error) {
      console.error(error.message);
    }
  },

  updateLicensePeriod: async (lp,cdScenario) => {
    try {
      const results = await createNewCeCycle
        .knex('LICENSE_PERIOD')
        .where('ID_LICENSE_PERIOD', lp.ID_LICENSE_PERIOD_NEW)
        .update({
          CD_SCENARIO: cdScenario
        });
      return results;
    } catch (error) {
      console.error(error.message);
    }
  },

  updateLicense: async l => {
    try {
      const results = await createNewCeCycle
        .knex('LICENSE')
        .where('PK_LICENSE', l.PK_LICENSE)
        .update({
          DT_EXPIRE_FROM_PRAES: l.DT_EXPIRE_FROM_PRAES,
          ID_UPDATED: 1,
          DT_UPDATED: new Date()
        });
      return results;
    } catch (error) {
      console.error(error.message);
    }
  },
  
  scheduleEvents: async lp => {
    try {
      const results = await createNewCeCycle.knex
        .raw(` 
            begin
            pkg_compliance_queue_api.push(
                pid_user                 => ${lp.ID_USER},
                pid_user_logon           => 9,  
                pcd_came_from            => '',
                pcd_entity_came_from     => 'LICENSE_PERIOD',
                pid_entity_came_from     => ${lp.ID_LICENSE_PERIOD_NEW},
                pin_reset_credits        => 1,
                pdt_affected             => to_date('12/31/2018','MM/DD/YYYY'),
                pin_calc_emp_transcripts => 0,
                pin_do_not_commit        => 0
            );
           
            pkg_license_change_api.push(
              pid_entity          => ${lp.PK_LICENSE},
              pcd_event_type      => pkg_license_change_api.event_updated,
              pcd_came_from       => 'pkg_bg_upgrade_license_tn.process_license_data_chiro',
              pin_do_not_commit   => 1
          );
            
           commit; 

          end;
            `);
      return results;
    } catch (error) {
      console.error(error.message);
    }
  }

}
module.exports = {
  createNewCeCycle
};
