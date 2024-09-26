
    module.exports = function (app) {
        const modelName = 'training_program_ownership';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            organisationName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
organisationType: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
ownershipType: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
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