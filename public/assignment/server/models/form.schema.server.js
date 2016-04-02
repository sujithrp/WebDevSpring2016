/**
 * Created by SujithNarayan on 4/1/2016.
 */
module.exports = function(mongoose) {
    var fieldSchema = require('./field.schema.server.js');

    var FormSchema = mongoose.Schema({
        userId: String,
        title: {type:String, default:'New Form'},
        fields: [{type:mongoose.Schema.Types.Object, ref:'field'}],
        created: {type:Date, default:new Date()},
        updated: {type:Date, default:new Date()}
    }, {collection: 'form'});
    return FormSchema;
};