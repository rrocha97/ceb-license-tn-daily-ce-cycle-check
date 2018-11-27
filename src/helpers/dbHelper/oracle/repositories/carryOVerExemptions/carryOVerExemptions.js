
const carryOVerExemptions = {
  init: knex => {
    carryOVerExemptions.knex = knex;

  },
  searchExemptionPriorCycle: async (idLicensePeriod) => {
    try {
      const results = await carryOVerExemptions.knex
      .select('id_exemption')
      .from('LP_EXEMPTION_XREF')
      .where('ID_LICENSE_PERIOD',idLicensePeriod);
      return results;
    } catch (error) {
      console.error(error.message);
    }
  },
 
  tiedExemptionNewCycle: async (lpex) => {
    try {
      const results = await carryOVerExemptions.knex().raw(`
      begin
        pkg_license_period_api.add_exemption(
          pid_license_period => ${lpex.idLicensePeriod},
          pid_exemption => ${lpex.ID_EXEMPTION},
          pid_user_logon =>9, 
          pcd_status => 'APPROVED',  
          pin_initially_licensed => 0,
          pin_set_id_lp_exemption => 0);
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
  carryOVerExemptions
};
