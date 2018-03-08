'use strict';
const chalk = require('chalk');
module.exports = function(Vendors) {
    Vendors.add = (staff_number, name, cb) => {
        console.log(chalk.blue(staff_number));
        console.log(chalk.red(name));
        const newVendor = {
            'staff_number': staff_number,
            'name': name
        }
        Vendors.create(newVendor, (err, instance) => {
            cb(err, instance);
        })
    }
    Vendors.remoteMethod('add', {
        accepts: [{
            arg:'staff_number',
            type: 'number',
            required: true
        },
        {
            arg:'name',
            type: 'string',
            required: true
        }
        ],
        http: {
            path: '/add',
            verb: 'post'
        }, 
        returns: {
            arg: 'vendor',
            type: 'object'
        }
    })
    Vendors.removeVendor = (id, cb) => {
        //Modelo
        Vendors.destroyById(id, (err) => {
            if(err){
                cb(error, false);
            }else{
                cb(null, true);
            }
        })

        //Instance
        // Vendors.findById(id, (err, instance) => {
        //     instance.destroy(() =>{
        //         cb(err, true);
        //     })
        // })
    }

    Vendors.remoteMethod('removeVendor', {
        accepts: {
            arg: 'id',
            type: 'number',
            required: true
        },
        http: {
            path: '/removeVendor',
            verb: 'post'
        },
        returns: {
            arg: 'vendor',
            type: 'boolean'
        }

    })
};
