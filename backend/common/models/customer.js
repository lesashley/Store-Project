'use strict';
const chalk = require('chalk');
module.exports = function(Customer) {
    Customer.add = (customers, phone, name, address, cb) => {
        console.log(chalk.blue(customers));
        console.log(chalk.red(name));
        const newCustomer = {
            'customers': customers,
            'phone': phone,
            'name': name,
            'address': address
        }
        Customer.create(newCustomer, (err, instance) => {
            cb(err, instance);
        })
    }
    Customer.remoteMethod('add', {
        accepts: [{
            arg:'customers',
            type: 'string',
            required: true
        },
        {
            arg:'phone',
            type: 'string',
            required: true
        },
        {
            arg:'name',
            type: 'string',
            required: true
        },
        {
            arg:'address',
            type: 'string',
            required: true
        }
        ],
        http: {
            path: '/add',
            verb: 'post'
        }, 
        returns: {
            arg: 'customer',
            type: 'object'
        }
    })
};
