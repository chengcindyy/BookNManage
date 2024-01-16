import mongoose from 'mongoose';
import { Provider } from './models/Provider.js';
import { Booking } from './models/Booking.js';
import { Permission } from './models/Permission.js';
import { Role } from './models/Role.js';

// Connet to Mongodb
const url = 'mongodb://localhost:27017/kingfeetDB'; 
mongoose.connect(url)
    .then(() => console.log("Database connected"))
    .catch(err => console.error("Database connection error", err));


// // Create a new booking document
// const booking1 = new Booking({
//     user: "5fcf4b2b9b9e4c1c6c1d8e9d",
//     location: "King Feet Massage - Richmond",
//     service: "Reflexology",
//     addons: ["Hot Stone"],
//     provider: "John Smith",
//     date: "2020-12-11",
//     time: "10:00"   
// });

// const addBooking = async () => {

//     try {
//         const saveBooking = await booking1.save();
//         console.log(`Your booking at ${saveBooking.location} was created successfully.`);
//     } catch (err) {
//         console.log("ERROR: ", err.message);
//     }
// }
// addBooking();

// Create a new provider document
const provider1 = new Provider({
    user: "656eea2d555e08db05780e5d",
    name: "John Smith",
    location: "King Feet Massage - Richmond",
    phone: 6041234567,
    services: [{
        name: "Reflexology",
        description: "A foot massage"
    }],
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    availableHours: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    description: "John Smith is a registered massage therapist with 10 years of experience. He specializes in reflexology and deep tissue massage."
});

const provider2 = new Provider({
    user: "6570f8e9add76965a581228f",
    name: "Jane Doe",
    location: "King Feet Massage - Richmond",
    phone: 6041234567,
    services: [
        {
        name: "Reflexology",
        description: "A foot massage"        
        },
        {
        name: "Acupuncture",
        description: "A foot massage"
        }
    ],
    availableDays: ["Mon", "Tue", "Sat", "Sun"],
    availableHours: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "17:00"],
    description: "Jane Doe is a registered massage therapist with 10 years of experience. She specializes in reflexology and deep tissue massage."
});

const addProvider = async () => {
    try {
        const saveProvider1 = await provider1.save();
        console.log(`Your provider ${saveProvider1.name} was created successfully.`);

        const saveProvider2 = await provider2.save();
        console.log(`Your provider ${saveProvider2.name} was created successfully.`);
    } catch (err) {
        console.log("ERROR: ", err.message);
    }
}
addProvider();

const initRolesAndPermissions = async () => {
    try {

        const permissionsToCreate = [
            { name: 'edit_role', description: 'Edit role' },
            { name: 'edit_product', description: 'Edit products' },
            { name: 'view_reports', description: 'View reports' },
            { name: 'manage_users', description: 'Manage users' },
            { name: 'manage_orders', description: 'Manage orders' },
            { name: 'manage_inventory', description: 'Manage inventory' },
            { name: 'access_sensitive_data', description: 'Access sensitive data' },
            { name: 'configure_settings', description: 'Configure settings' },
            { name: 'view_products', description: 'View products' },
            { name: 'create_orders', description: 'Create orders' },
            { name: 'view_personal_orders', description: 'View personal orders' },
            { name: 'edit_profile', description: 'Edit profile' },
            { name: 'submit_feedback', description: 'Submit feedback' }
          ];

        // Check if exist
        const createPermissionIfNotExist = async (name, description) => {
            const existingPermission = await Permission.findOne({ name });
            if (!existingPermission) {
                return await Permission.create({ name, description });
            }
            return existingPermission;
        };

        const createPermissionAndGetId = async (name, description) => {
            let permission = await Permission.findOne({ name });
            if (!permission) {
                permission = await Permission.create({ name, description });
            }
            return permission._id;
        };

        const permissionIds = {};
        for (const permissionData of permissionsToCreate) {
            permissionIds[permissionData.name] = await createPermissionAndGetId(permissionData.name, permissionData.description);
        }
          
        // Create permissions
        for (const permissionData of permissionsToCreate) {
            await createPermissionIfNotExist(permissionData.name, permissionData.description);
        }

        // Check Role exist
        const createRoleIfNotExist = async (name, permissions) => {
            const existingRole = await Role.findOne({ name });
            if (!existingRole) {
                return await Role.create({ name, permissions });
            }
            return existingRole;
        };      

        // Create Roles
        const adminRole = await createRoleIfNotExist('admin', [
            permissionIds['edit_role'],
            permissionIds['edit_product'],
            permissionIds['view_reports'],
            permissionIds['manage_users'],
            permissionIds['manage_orders'],
            permissionIds['manage_inventory'],
            permissionIds['access_sensitive_data'],
            permissionIds['configure_settings'],
            permissionIds['view_products'],        
            permissionIds['create_orders'],
            permissionIds['view_personal_orders'],
            permissionIds['edit_profile'],
            permissionIds['submit_feedback']   
        ]);

        const superUserRole = await createRoleIfNotExist('superUser', [
            permissionIds['edit_product'],
            permissionIds['view_reports'],
            permissionIds['manage_users'],
            permissionIds['manage_orders'],
            permissionIds['manage_inventory'],
            permissionIds['configure_settings'],
            permissionIds['view_products'],        
            permissionIds['create_orders'],
            permissionIds['view_personal_orders'],
            permissionIds['edit_profile']   
        ]);

        const employeeRole = await createRoleIfNotExist('employee', [
            permissionIds['configure_settings'],
            permissionIds['create_orders'],
            permissionIds['view_personal_orders'],
            permissionIds['edit_profile'],
            permissionIds['submit_feedback']   
        ]);

        const userRole = await createRoleIfNotExist('user', [
            permissionIds['view_products'],        
            permissionIds['create_orders'],
            permissionIds['view_personal_orders'],
            permissionIds['edit_profile'],
            permissionIds['submit_feedback']   
        ]);

        console.log('Roles and permissions initialized successfully');
    } catch (err) {
        console.error("ERROR initializing roles and permissions: ", err.message);
    }
};

initRolesAndPermissions();

