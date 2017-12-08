import Knex from './knex'
import jwt from 'jsonwebtoken'
var moment = require('moment')

const opts = {
  logFilePath: 'log.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
}

// import GUID from 'node-uuid'

const routes = [
   /* TIMETABLE */
  // timetable
  {
    path: '/add_timetable',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      let result
      const { id, subject_id, year_id, section_id, professor_regno, day, period, subject_id2, professor_regno2 } = request.payload
      if (!subject_id || !section_id || !professor_regno || !year_id || !day || !period) {
        return reply({
          success: false,
          message: 'Incomplete data, please send all fields'
        })
      }
      console.log('request payload',request.payload);

      // delete existing timetable
      let q = `update timetable set status = 0 where day = '${day}' and period = ${period} and year_id = ${year_id} and section_id = ${section_id}`
      Knex.raw(q).then(res => {})

      // first subject
      let parr = professor_regno.split(',')
      console.log(`parr is`, parr)

      parr.forEach(item => {
        console.log(`item is`, item, day, period, year_id, section_id, subject_id, reply)
        result = addTimeTablePart2(item, day, period, year_id, section_id, subject_id, reply)
      })    

      // second subject
      if (subject_id2 && professor_regno2) {
        let parr = professor_regno2.split(',')
        console.log(`parr is`, parr)
  
        parr.forEach(item => {
          console.log(`item is`, item)
          result = addTimeTablePart2(item, day, period, year_id, section_id, subject_id2, reply)
        })    
      } 

    }
  },

  // get timetable
  {
    path: '/get_timetable',
    method: 'POST',
    handler: (request, reply) => {
      if (!request.payload || !request.payload.year_id || !request.payload.section_id||!request.payload.semister_id) {
        return reply({
          success: false,
          message: 'Incomplete data, please send all fields'
        })
      }
      let {year_id, section_id,semister_id} = request.payload

      console.log(request.payload)
    // Sir  // Knex.raw(`select day, period, group_concat(professor_regno separator ',') as professor_regno, group_concat(DISTINCT subject SEPARATOR ' / ') as subject, GROUP_CONCAT(subject_id separator ',') as subject_id, section_professor_id from ( select t.day, t.period, group_concat( s.professor_regno ORDER BY s.professor_regno ASC SEPARATOR '/') as professor_regno, group_concat(DISTINCT y.subject SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id, s.id as section_professor_id from timetable t inner join section_professor s on s.id = t.section_professor_id inner join year_subject y on y.id = s.subject_id where t.status = 1 and t.year_id = ${year_id} and t.section_id = ${section_id} group by day, period, subject_id) as d group by day, period
      // `).then((result) => {
     //trail -1    Knex.raw(`select t.day, t.period, group_concat( t.reg_no ORDER BY t.reg_no ASC SEPARATOR '/') as professor_regno, group_concat(DISTINCT s.subject_name SEPARATOR ' / ') as subject, group_concat(DISTINCT ss.id) as subject_id, s.id as section_professor_id FROM timetable t INNER JOIN subj_sems ss on ss.id=t.sub_id INNER JOIN subjects s on s.id=ss.subject_id INNER JOIN year_subject y on y.id=ss.semister_id where t.status = 1 and t.year_id = ${year_id} and t.section_id=${section_id} group by t.day, t.period, t.sub_id 
      //  `).then((result) => {
      //  Knex.raw(` SELECT t.day,period, GROUP_CONCAT(t.reg_no   SEPARATOR ',') as professor_regno, GROUP_CONCAT(DISTINCT s.subject_name SEPARATOR ' / ') as subject,group_concat( sub_id separator ',') as subject_id  FROM  timetable t INNER JOIN subj_sems ss on ss.id=t.sub_id INNER JOIN   subjects s on s.id=ss.subject_id INNER JOIN  year_subject y on y.id=ss.semister_id WHERE t.status = 1 and t.year_id=${year_id} and section_id=${section_id} and  y.id=${semister_id} GROUP by day, period,t.year_id,section_id  order by t.id  
      //      `).then((result) => {
            Knex.raw(` SELECT t.day,period, GROUP_CONCAT(t.reg_no   SEPARATOR ',') as professor_regno, GROUP_CONCAT(DISTINCT s.subject_name SEPARATOR ' / ') as subject,group_concat( sub_id separator ',') as subject_id  FROM  timetable t INNER JOIN subj_sems ss on ss.id=t.sub_id INNER JOIN   subjects s on s.id=ss.subject_id INNER JOIN  year_subject y on y.id=ss.semister_id WHERE t.status = 1 and t.year_id=${year_id} and section_id=${section_id}  and  y.id=${semister_id}  GROUP by day, period,t.year_id,section_id  order by t.id 
            `).then((result) => {        
        let output = []
 
        // get template data
        Knex.raw(`select timing_template from timings_year where year_id = ${year_id} limit 1`).then(res => {
          if (!res) {
      
            return reply({
              success: false,
              message: 'Server error, failed to retrieve timing_template'
            })
          }
          console.log('second query exectued',res);
          let timingTemplate = 'DEFAULT'
          if (res[0] && res[0][0] && res[0][0]['timing_template']) {
            console.log(`res = `, res[0][0]['timing_template'])
            timingTemplate = res[0][0]['timing_template']
          }

          console.log('timing_template', timingTemplate)
          Knex.raw(`select period, time_format(period_from, '%h:%i') as period_from, time_format(period_to, '%h:%i') as period_to, lunch from timings where timing_template = '${timingTemplate}'`).then(resTemplate => {
            if (!res) {
              return reply({
                success: false,
                message: 'Server error, failed to retrieve timing_template'
              })
            }

            console.log('resTemplate', resTemplate[0])

            output.push(resTemplate[0]) // template data
            output.push(result[0]) // timetable data
            return reply({
              success: true,
              data: output
            })
          })
        })
      })
    }
  },

  // get all sections timetable
  {
    path: '/get_all_timetable',
    method: 'POST',
    handler: (request, reply) => {
      // if (!request.payload) {
      //   return reply({
      //     success: false,
      //     message: 'Incomplete data, please send all fields'
      //   })
      // }
      let {branch_id, day, college_id, course_id, year_id, dept, college, master_role} = request.payload
      let cond = ''

      if (college_id) {
        cond += ` college_id = ${college_id} and `
      }
      if (course_id) {
        cond += ` course_id = ${course_id} and `
      }
      if (branch_id) {
        cond += ` branch_id = ${branch_id} and `
      }
      if (year_id) {
        cond += ` year_id = ${year_id} and `
      }
      if (dept) {
        cond += ` year_id in (select id from raghuerp_db.year where department = (select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1))) and `
      }

      if (!day) {
        day = moment().format('ddd')
      }

      if (cond) {
        cond = ` where ${cond}`
        cond = cond.substr(0, cond.length - 4)
      }
      console.log('hellow',cond);
      // let query = `select y.college_id, y.course_id, y.year_id,y.branch_id,t.section_id,y.subject,s.professor_regno,t.day,t.period from year_subject y inner join section_professor s on y.id=s.subject_id inner join timetable t on s.id=t.section_professor_id where ${cond} t.day = '${day}' order by t.year_id,t.section_id,t.period`

      // let query = `select t.*, y.*, s.professor_regno, y.subject from timetable t inner join section_professor s on t.section_professor_id = s.id inner join year_subject y on y.id = s.subject_id and y.branch_id = ${branch_id}  where t.day = '${day}' and t.year_id in (select year_id from year_subject ${cond})`

      // let query = `SELECT b.branch,
      // ye.year, se.section, s.professor_regno, y.subject, t.period FROM timetable t inner join section_professor s on t.section_professor_id = s.id inner join year_subject y on y.id = s.subject_id 
      // inner join raghuerp_db.sections se on se.id = t.section_id
      // inner join raghuerp_db.year ye on ye.id = t.year_id
      // inner join raghuerp_db.branches b on b.id = ye.branch
      // WHERE t.year_id in (select id from raghuerp_db.year where department = (select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1)))`
      



      // let query = `SELECT b.branch, ye.year, se.section, group_concat(DISTINCT s.professor_regno ORDER BY s.professor_regno ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT y.subject SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to, time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch FROM timetable t inner join section_professor s on t.section_professor_id = s.id inner join year_subject y on y.id = s.subject_id  inner join raghuerp_db.sections se on se.id = t.section_id inner join raghuerp_db.year ye on ye.id = t.year_id inner join raghuerp_db.branches b on b.id = ye.branch left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
      // left join timings_year ty on ty.year_id = t.year_id 
      // left join timings on timings.timing_template = ty.timing_template and t.period = timings.period  where t.status = 1 and  t.day = '${day}' and t.year_id in (select year_id from year_subject ${cond}) group by t.year_id, t.section_id, t.day, t.period`

      let query = `SELECT b.branch, y.semister, ye.year, se.section, group_concat(DISTINCT t.reg_no ORDER BY t.reg_no ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT ss.subject_name  SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to, time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch   FROM timetable t inner join subj_sems s on t.sub_id = s.id inner join year_subject y on y.id = s.semister_id   inner join subjects ss on ss.id=s.subject_id  inner join raghuerp_db.sections se on  se.id = t.section_id inner join raghuerp_db.year ye on ye.id = t.year_id inner join raghuerp_db.branches b on b.id = ye.branch  left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
                  left join timings_year ty on ty.year_id = t.year_id 
                  left join timings on timings.timing_template = ty.timing_template and t.period = timings.period WHERE t.status = 1 and  t.day = '${day}' and t.year_id in (select year_id from year_subject ${cond}) group by t.year_id, t.section_id, t.day, t.period `

      
      
 







      // master role = hod
      if (master_role == 'hod') {
        if (branch_id) {
          // query = `SELECT b.branch, ye.year, se.section, group_concat(DISTINCT s.professor_regno ORDER BY s.professor_regno ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT y.subject SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to,
          // time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch 
          // FROM timetable t 
          // inner join section_professor s on t.section_professor_id = s.id 
          // inner join year_subject y on y.id = s.subject_id 
          // inner join raghuerp_db.sections se on se.id = t.section_id 
          // inner join raghuerp_db.year ye on ye.id = t.year_id
          // inner join raghuerp_db.branches b on b.id = ye.branch 
          // left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
          // left join timings_year ty on ty.year_id = t.year_id 
          // left join timings on timings.timing_template = ty.timing_template and t.period = timings.period 
          // WHERE t.status = 1 and  t.day = '${day}' and t.year_id in (select id from raghuerp_db.year where branch = ${branch_id} and department=(select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1) limit 1))  group by t.year_id, t.section_id, t.day, t.period`
        
          query = `SELECT b.branch,y.semister,  ye.year, se.section, group_concat(DISTINCT t.reg_no ORDER BY t.reg_no ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT ss.subject_name SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to,
            time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch 
            FROM timetable t 
            inner join subj_sems s on t.sub_id = s.id 
            inner join year_subject y on y.id = s.semister_id 
            inner join subjects ss on ss.id=s.subject_id 
            inner join raghuerp_db.sections se on se.id = t.section_id
            inner join raghuerp_db.year ye on ye.id = t.year_id 
            inner join raghuerp_db.branches b on b.id = ye.branch 
            left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
            left join timings_year ty on ty.year_id = t.year_id 
            left join timings on timings.timing_template = ty.timing_template and t.period = timings.period 
            WHERE t.status = 1 and  t.day = '${day}' and t.year_id in (select id from raghuerp_db.year where branch = '${branch_id}' and department=(select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1) limit 1))  group by t.year_id, t.section_id, t.day, t.period`







        } else {
          // query = `SELECT b.branch, ye.year, se.section, group_concat(DISTINCT s.professor_regno ORDER BY s.professor_regno ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT y.subject SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to, 
          // time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch
          // FROM  timetable t 
          // inner join section_professor s on t.section_professor_id = s.id 
          // inner join year_subject y on y.id = s.subject_id 
          // inner join raghuerp_db.sections se on se.id = t.section_id 
          // inner join raghuerp_db.year ye on ye.id = t.year_id 
          // inner join raghuerp_db.branches b on b.id = ye.branch 
          // left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
          // left join timings_year ty on ty.year_id = t.year_id 
          // left join timings on timings.timing_template = ty.timing_template and t.period = timings.period           
          // WHERE t.status = 1 and  t.day = '${day}' and t.year_id in (select id from raghuerp_db.year where department=(select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1) limit 1))  group by t.year_id, t.section_id, t.day, t.period`
          
          query = `SELECT b.branch, y.semister,  ye.year, se.section, group_concat(DISTINCT t.reg_no ORDER BY t.reg_no ASC SEPARATOR ',') as professor_regno, group_concat(DISTINCT ss.subject_name SEPARATOR ' / ') as subject, group_concat(DISTINCT y.id) as subject_id,  t.period, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to,
          time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, timings.lunch, t2.lunch as default_lunch 
          FROM timetable t 
          inner join subj_sems s on t.sub_id = s.id 
          inner join year_subject y on y.id = s.semister_id 
          inner join subjects ss on ss.id=s.subject_id 
          inner join raghuerp_db.sections se on se.id = t.section_id
          inner join raghuerp_db.year ye on ye.id = t.year_id 
          inner join raghuerp_db.branches b on b.id = ye.branch 
          left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
          left join timings_year ty on ty.year_id = t.year_id 
          left join timings on timings.timing_template = ty.timing_template and t.period = timings.period 
          WHERE t.status = 1 and  t.day = '${day}' and t.year_id in (select id from raghuerp_db.year where department=(select id from raghuerp_db.departments where department = '${dept}' and college = (select id from raghuerp_db.colleges where college = '${college}' limit 1) limit 1))  group by t.year_id, t.section_id, t.day, t.period`

      
      
        }
      }

      console.log('all timetable query', query)
      Knex.raw(query).then((result) => {
        return reply({
          success: true,
          data: result[0]
        })
      })
    }
  },

  // faculty timetable
  {
    path: '/get_timetable_faculty',
    method: 'POST',
    handler: (request, reply) => {
      if (!request.payload || !request.payload.professor_regno) {
        return reply({
          success: false,
          message: 'professor_regno is required'
        })
      }
      let {professor_regno} = request.payload
    console.log(request.payload);
      // Knex.raw(`SELECT t.day, t.period, s.professor_regno, y.subject, y.college_id, y.course_id, y.branch_id, y.year_id, s.section_id, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to, time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to FROM timetable t inner join section_professor s on s.id = t.section_professor_id inner join year_subject y on y.id = s.subject_id 
      
      // left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
      // left join timings_year ty on ty.year_id = t.year_id 
      // left join timings on timings.timing_template = ty.timing_template and t.period = timings.period 
      // where t.status = 1 and s.professor_regno = '${professor_regno}'`).then((result) => {

        Knex.raw(` SELECT t.day, t.period, t.reg_no as professor_regno , y.semister, y.college_id, y.course_id, y.branch_id, y.year_id, t.section_id, time_format(timings.period_from, '%h:%i') as period_from, time_format(timings.period_to, '%h:%i') as period_to, time_format(t2.period_from, '%h:%i') as default_period_from, time_format(t2.period_to, '%h:%i') as default_period_to, ss.subject_name as subject FROM timetable t 
        inner join subj_sems s on s.id = t.sub_id 
        inner join year_subject y on y.id = s.semister_id
        inner join subjects ss on ss.id=s.subject_id
              left join timings t2 on t2.timing_template = 'DEFAULT' and t2.period = t.period
              left join timings_year ty on ty.year_id = t.year_id 
              left join timings on timings.timing_template = ty.timing_template and t.period = timings.period 
              where t.status = 1 and t.reg_no = '${professor_regno}'`).on('query-error',function(error,obj){
        log.info(error)
        console.log(res)
      }).then((res)=>{
        reply({
          success: true,
          data: res[0]
        })
      }).catch((err)=>{
        reply({
          success:false,
          message:err.message
        })
      })
    }
  },

  // Remove Period
  {
    path: '/remove_period',
    method: 'POST',
    handler: (request, reply) => {
      if (!request.payload || !request.payload.day || !request.payload.period || !request.payload.year_id || !request.payload.section_id) {
        return reply({
          success: false,
          message: 'Incomplete data, please send all fields - day, period, year_id, section_id, section_professor_id'
        })
      }
      let {day, period, year_id, section_id, section_professor_id} = request.payload

      Knex.raw(`update timetable set status = 0 where day = '${day}' and period = ${period} and year_id = ${year_id} and section_id = ${section_id}`).then((result) => {
        return reply({
          success: true,
          data: result[0],
          // temp: `delete from timetable where day = '${day}' and period = ${period} and year_id = ${year_id} and section_id = ${section_id} and section_professor_id = ${section_professor_id} limit 1`
        })
      })
    }
  },

  // Add Timings Template
  {
    path: '/timings_template',
    method: 'POST',
    handler: (request, reply) => {
      if (!request.payload || !request.payload.template_name || !request.payload.data) {
        return reply({
          success: false,
          message: 'Data not received'
        })
      }

      let {template_name, data} = request.payload
      let input = []
      data.forEach(item => {
        input.push({
          timing_template: template_name,
          period: item.period,
          period_from: item.period_from,
          period_to: item.period_to,
          lunch: +item.lunch          
        })
      })

      console.log('input: ', input)

      if (input && input.length) {
        insertOrUpdate(Knex, 'timings', input).then(res => {
          if (!res) {
            return reply({
              success: false,
              message: 'server error'
            })
          }
          return reply({
            success: true,
            message: res
          })
        })
      }
    }
  },

  // View Timings Template
  {
    path: '/timings_template',
    method: 'GET',
    handler: (request, reply) => {
      Knex.raw('select timing_template, period, period_from, period_to, lunch from timings order by timing_template, period_from').then(res => {
        return reply({
          success: true,
          data: res[0]
        })
      })
    }
  },

  // // Remove Timings Template
  // {
  //   path: '/timing_template',
  //   method: 'DELETE',
  //   handler: (request, reply) => {
  //     if (!request.payload || !request.payload.timing_template) {
  //       return reply({
  //         success: false,
  //         message: 'timings_template required'
  //       })
  //     }
  //     let {timing_template} = request.payload

  //     Knex.raw(`delete from timings where timing_template = '${timing_template}' limit 1`).then((result) => {
  //       reply({
  //         success: true,
  //         data: result[0]
  //       })
  //     })
  //   }
  // },

  // Link year to template
  {
    path: '/year_template',
    method: 'POST',
    handler: (request, reply) => {
      if (!request.payload || !request.payload.data) {
        return reply({
          success: false,
          message: 'data required'
        })
      }
      let {data} = request.payload
      insertOrUpdate(Knex, 'timings_year', data).then(res => {
        if (!res) {
          return reply({
            success: false,
            message: 'Failed linking templates to years'
          })
        }
        return reply({
          success: true
        })
      })
    }
  },

  // View year and template link
  {
    path: '/year_template',
    method: 'GET',
    handler: (request, reply) => {
      Knex.raw(`SELECT timing_template, group_concat(year_id) as year_id FROM timings_year group by timing_template`).then(res => {
        if (!res) {
          return reply({
            success: false,
            message: 'Failed retrieving year and template link'
          })
        }
        return reply({
          success: true,
          data: res[0]
        })
      })
    }
  },

  {
    path: '/getsubjects',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      var query = Knex('year_subject').select(Knex.raw('distinct subj_sems.semister_id AS temp'),'year_subject.id', 'college_id', 'course_id', 'branch_id', 'year_id', 'semister', Knex.raw('coalesce(subj_sems.semister_id,0) AS existed') )
                  .leftJoin('subj_sems','subj_sems.semister_id','year_subject.id')
      if (request.payload) {
        const { years } = request.payload
        if (years) {
          query.whereIn('year_id', years)
        }
      }

      query.on('query-error', function (error, obj) {
        log.info(error)
      })
        .then((results) => {
          if (!results || results.length === 0) {
            reply({
              success: false,
              success: false,
              message: 'No subjects exist'
            })
          }

          reply({
            success: true,
            dataCount: results.length,
            data: results
          })
        }).catch((err) => {
        reply({
          success: false,
          message: err
        })
      })
    }
  },

  // add a subject
  {
    path: '/subjects',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      const { id, college_id, course_id, branch_id, year_id, subject } = request.payload
      if (!college_id || !course_id || !branch_id || !year_id) {
        reply({
          success: false,
          message: 'Incomplete data, please send all fields'
        })
      }

      let fields = {
        college_id: college_id,
        course_id: course_id,
        branch_id: branch_id,
        year_id: year_id,
        semister: subject.trim()
      }

      if (id > 0) {
        fields = {
          id,
          college_id: college_id,
          course_id: course_id,
          branch_id: branch_id,
          year_id: year_id,
          semister: subject.trim()
        }
      }

      // insertOrUpdate(Knex, 'year_subject', fields).on('query-error', function (error, obj) {
      //   log.info(error)
      // }).then((res) => {
      //   reply({
      //     success: true,
      //     message: 'successfully added subject'
      //   })
      // }).catch((err) => {
      //   reply({
      //     success: false,
      //     error: err.message
      //   })
      // })
      if(id > 0 ) {
        let  query = Knex('year_subject').where('id',id).update(fields)
        query.then((results) => {
          reply({
            success: true,
            message: 'Successfully Updated'
          })
        }).catch((err) => {
          reply({success: false, message: err})
        })
      
      }
       else{
        let  query =  Knex('year_subject').insert(fields)
        query.then((results) => {
         reply({
            success: true,
            message: 'Successfully added subject'
          })
        }).catch((err) => {
          reply({success: false, message: err})
        })

      }




    }
  },

  {
    path: '/professorsubject',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      // let query = Knex('year_subject').select('section_professor.id', 'section_professor.subject_id', 'college_id', 'course_id', 'branch_id', 'year_id', 'section_id', 'semister_id', 'professor_regno')
      //   .innerJoin('section_professor', 'section_professor.subject_id', 'year_subject.id')

        
        // let query = Knex('section_professor').select('section_professor.id','subj_sems.id as ssid','subj_sems.semister_id as sssem_id','subj_sems.subject_id', 'section_professor.subject_id', 'year_subject.college_id', 'year_subject.course_id', 
        // 'year_subject.branch_id', 'year_subject.year_id','year_subject.semister as semister_id', 'section_professor.section_id', 'section_professor.subject_id', 'section_professor.professor_regno','subjects.subject_name','subjects.id as subid')
        //  .innerJoin('subj_sems','subj_sems.id','section_professor.subject_id')
        //  .innerJoin('year_subject','year_subject.id','subj_sems.semister_id')
        //  .innerJoin('subjects','subjects.id','subj_sems.subject_id')

        let query = Knex('timetable').select('timetable.sub_id as ttid','timetable.section_id','subj_sems.id as ssid','year_subject.college_id','year_subject.course_id','year_subject.branch_id','year_subject.year_id','year_subject.semister as semister_id',
      'subjects.subject_name','subjects.subject_code','subjects.regulation','subjects.units')
      .innerJoin('subj_sems','subj_sems.id','timetable.sub_id')
      .innerJoin('year_subject','subj_sems.semister_id','year_subject.id')
      .innerJoin('subjects','subj_sems.subject_id','subjects.id')
       
      if (request.payload) {
        const { reg_no, year_id } = request.payload
        if (reg_no) {
          query.where('timetable.reg_no', reg_no).orderBy('timetable.sub_id','desc') 
        }
        if (year_id && year_id.length > 0) {
          query.whereIn('year_subject.year_id', year_id).orderBy('timetable.sub_id','desc')
        }
        console.log('year id is', year_id)
      }



      query.on('query-error', function (error, obj) {
        log.info(error)
      }).then((results) => {
        if (!results || results.length === 0) {
          return reply({
            success: false,
            message: 'No subjects allotted to professors'
          })
        }

        return reply({
          success: true,
          dataCount: results.length,
          data: results
        })
      }).catch((err) => {
        reply({
          success: false,
          message: err
        })
      })
    }
  },

   // add a subject
   {
    path: '/addSubject',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      const { id, subject_name,course_code, subject_code, regulation, units } = request.payload
     

      let fields = {
        subject_name: subject_name,
        course_code: course_code.trim(),
        subject_code: subject_code.trim(),
        regulation: regulation,
        units: units,
         
      }

      if (id > 0) {
        fields = {
          id,
          subject_name: subject_name,
          course_code: course_code.trim(),
          subject_code: subject_code.trim(),
          regulation: regulation,
          units: units,
        }
      }

      // insertOrUpdate(Knex, 'subjects', fields).on('query-error', function (error, obj) {
      //   log.info(error)
      // }).then((res) => {
      //   reply({
      //     success: true,
      //     message: 'successfully added subject'
      //   })
      // }).catch((err) => {
      //   reply({
      //     success: false,
      //     error: err.message
      //   })
      // })

     
      if(id > 0 ) {
        let  query = Knex('subjects').where('id',id).update(fields)
        query.then((results) => {
          reply({
            success: true,
            message: 'Successfully Updated'
          })
        }).catch((err) => {
          reply({success: false, message: err})
        })
      
      }
       else{
        let  query =  Knex('subjects').insert(fields)
        query.then((results) => {
         reply({
            success: true,
            message: 'Successfully added subject'
          })
        }).catch((err) => {
          reply({success: false, message: err})
        })

      }
     
    }
  },
  {
    path:'/getsubjects_New',
    method : 'POST',
    config:{
      auth:{
        strategy: 'token'
      }
    },
    handler: (request, reply) => {
      const {college, from, to} = request.payload

      let q = `SELECT s.*,coalesce(ss.subject_id,0) as existed from subjects s left join subj_sems ss on s.id=ss.subject_id order by id desc`

      let query = Knex.raw(q)

      query.then((results) => {
       // console.log('results are', results)
        if (!results || results.length === 0) {
          reply({
            success: false,
            errMessage: 'no data found'
          })
        }

        reply({
          success: true,
          dataCount: results[0].length,
          data: results[0]
        })
      }).catch((err) => {
        reply('server-side error' + err)
      })
    }
  },
  {
    path:'/linkSubjectsSems',
    method:'POST',
    config:{
      auth:{
        strategy:'token'
      }
    },
    handler:(request,reply)=>{
      const {id,subject_id,new_subject_id} = request.payload
      console.log(request.payload,'add subject id');
      let fields = {
        semister_id: subject_id,
        subject_id: new_subject_id,    
      }
       
      console.log(fields);
      if (id > 0) {
        fields = {
          id,
          semister_id: subject_id,
          subject_id: new_subject_id,
        }
      }

      insertOrUpdate(Knex,'subj_sems',fields).on('query-error',function(error,obj){
        log.info(error)
      }).then((res)=>{
        reply({
          success:true,
          message:'successfully linked selected subject to sem'
        })
      }).catch((err)=>{
        reply({
          success:false,
          message:err.message
        })
      })
  }
  },
  {
    path:'/getLinkedSubjSems',
    method :'POST',
    config:{
      auth:{
        strategy : 'token'
      }
    },
    handler:(request,reply)=>{
     // const {college, from, to} = request.payload
      let q = `SELECT s.id,s.semister_id as yrtbl_id,s.subject_id as subjtbl_id,ss.subject_name,ss.subject_code,ss.course_code,ss.regulation,ss.units,ys.college_id,ys.course_id,ys.branch_id,ys.year_id,ys.semister from subj_sems s inner join subjects ss on s.subject_id=ss.id inner join year_subject ys on s.semister_id=ys.id order by ys.college_id,ys.course_id,ys.branch_id,ys.year_id,ys.semister asc`
      let query = Knex.raw(q)
      query.then((res)=>{
        if(!res || res.length==0){
          reply({
            success:false,
            errMessage:'no data found'
          })
        }
        reply({
          success:true,
          dataCount:res[0].length,
          data:res[0]
        }).catch((err)=>{
              reply('server-side error' + err)
           })
      })
    }
  
  },
  {
    path:'/getSelSem_Subjects',
    method : 'POST',
    config:{
      auth:{
        strategy : 'token'
      }
    },
    handler: (request,reply)=>{
     const {semister_id} = request.payload
     console.log(request.payload)
     var q1 = Knex('subj_sems').select('subj_sems.id','subj_sems.semister_id','subj_sems.subject_id','subj_sems.semister_id as yrtbl_id','subj_sems.subject_id as subjtbl_id', 'subjects.subject_name','subjects.course_code','subjects.subject_code','subjects.regulation','subjects.units','year_subject.college_id','year_subject.course_id','year_subject.branch_id','year_subject.year_id','year_subject.semister as semister_id')
              .innerJoin('subjects','subj_sems.subject_id', 'subjects.id')
              .innerJoin('year_subject','subj_sems.semister_id','year_subject.id')
              .where('subj_sems.semister_id',semister_id)
      
      q1.on('query-error', function (error, obj) {
                log.info(error)
              }).then((res)=>{
        if(!res || res.length==0){
          reply({
            success:false,
             errMessage:'No data found',
          })
        }
        reply({
          success:true,
          dataCount:res.length,
          data : res
        }).catch((err)=>{
          reply('server-side error'+err)
        })
      })
  //   let q = `SELECT ss.*,s.subject_name,s.subject_code,s.regulation,s.units,ys.college_id,ys.course_id,ys.branch_id,ys.year_id,ys.subject  FROM subj_sems ss INNER JOIN subjects s  on ss.subject_id=s.id  INNER JOIN year_subject ys on ss.semister_id=ys.id WHERE semister_id=418 `
    }
  }
]

export default routes

function insertOrUpdate (knex, tableName, data) {
  const firstData = data[0] ? data[0] : data
  return knex.raw(knex(tableName).insert(data).toQuery() + ' ON DUPLICATE KEY UPDATE ' +
    Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(', '))
}

function addTimeTablePart2(professor_regno, day, period, year_id, section_id, subject_id, reply) {


  let fields = {
    day: day,
    period: +period,
    year_id: +year_id,
    section_id: +section_id
  }

   // check if professor is already allocated a section for this period
  //let engageQuery = `select count(*) as count from timetable t inner join section_professor s on s.professor_regno = '${professor_regno}' and t.section_professor_id = s.id where t.status=1 and day = '${day}' and period=${period} and (t.year_id <> ${year_id} or t.section_id <> ${section_id})`
   let engageQuery = `select count(*) as count from timetable t inner join subj_sems s on t.reg_no = '${professor_regno}' and t.sub_id = s.id where t.status=1 and day = '${day}' and period=${period} and (t.year_id <> ${year_id} or t.section_id <> ${section_id})`
   
         console.log(engageQuery)
   
         Knex.raw(engageQuery).then((engageQ) => {
           console.log(engageQ)
           let count = engageQ[0][0]['count']
           console.log('count is', count)
           if (!count) {
           //  Knex.raw(`select id from section_professor where subject_id = ${subject_id} and section_id = ${section_id} and professor_regno = '${professor_regno}'`).then((result1) => {
              Knex.raw(`select id from timetable where sub_id = ${subject_id} and section_id = ${section_id} and  reg_no = '${professor_regno}'`).then((result1) => {
                
              console.log('result1 fail ', result1[0].length)
               if (!result1[0].length) {
              //   Knex.raw(`insert into section_professor(subject_id, section_id, professor_regno) values(${subject_id}, ${section_id}, '${professor_regno}')`).then((result2) => {
                  Knex.raw(`insert into timetable(sub_id, section_id, reg_no) values(${subject_id}, ${section_id}, '${professor_regno}')`).then((result2) => {
                    
                   if (!result2 || (result2 && !result2[0].insertId)) {
                     return reply({
                       success: false,
                       error: 'Failed inserting Subject, Section and Professor, contact Administrator'
                     })
                   } else {
                    console.log('Update', result2)
                     let id = result2[0]['insertId']
                     // insert timetable
                    // fields['section_professor_id'] = result2[0]['insertId']
                    //fields['sub_id'] = result2[0]['insertId']
                     Knex('timetable').update(fields).where('id',id).then(result3 => {
                         return reply({
                           success: true,
                         result3})
                       })
                    //  insertOrUpdate(Knex, 'timetable', fields).then(result3 => {
                    //    return({
                    //      success: true,
                    //    result3})
                    //  })
                   }
                 })
               } else {
                 console.log('Insert', result1)
                // fields['section_professor_id'] = result1[0][0]['id']
             //   let id = result2[0]['insertId']
                 fields['sub_id'] = subject_id;
                 fields['reg_no'] = professor_regno;
                 Knex('timetable').insert(fields).then(result3 => {
                  return reply({
                    success: true,
                  result3})
                })
                //  insertOrUpdate(Knex, 'timetable', fields).then(result3 => {
                //    return ({
                //      success: true,
                //    result3})
                //  })
               }
             })
           } else {
             return reply({
               success: false,
               error: 'Faculty engaged already'
             })
           }
         })
}
