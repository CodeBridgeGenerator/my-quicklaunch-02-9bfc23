
    module.exports = function (app) {
        const modelName = 'officer_in_charge';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            officerName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
designation: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
nricPassport: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
email: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
organisationName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };