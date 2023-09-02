import Employee from "./models/employee-model"


export const getEmployeeByEmail = (email:string) => {
    return Employee.findOne({
        where: {
            email
        }
    })
}