
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
organisationName: faker.lorem.sentence(""),
numberOfEmployees: faker.lorem.sentence(""),
fullTimeTrainers: faker.lorem.sentence(""),
partTimeTrainers: faker.lorem.sentence(""),
organisationNo: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
