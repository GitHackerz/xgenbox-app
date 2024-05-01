const UserRole = {
    COMPANY: 'COMPANY',
    COLLECTOR: 'COLLECTOR',
    EMPLOYEE: 'EMPLOYEE',
    ADMIN: 'ADMIN'
};

const AccountType = {
    HOSPITAL : 'Hospital', // For Company
    CLINIC : 'Clinic', // For Company
    LABORATORY : 'Laboratory', // For Company
    RESEARCH_CENTER : 'Research center', // For Company
    INDIVIDUAL : 'Individual', // For Collector
    COMPANY: 'Company' // For Collector
};

const UserStatus = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected'
};

const BinActionType = {
    THROW: 'THROW',
    COLLECT: 'COLLECT'
};

module.exports = { UserRole, AccountType, UserStatus, BinActionType };