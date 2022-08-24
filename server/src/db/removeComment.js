import  db  from './db.js';
import obj from 'mongodb';
import assert from 'assert';

const {ObjectId} = obj;

const removeComment = async (bookId, commentIndex) => {
    const connection = db.getConnection();

    //Updates one document. Removes a comment from the reviewcomments array field of a book using $unset and $pull array operators
    await connection.collection('books').updateOne(
                                            {"_id": ObjectId(bookId)}, 
                                            {$unset: {[`reviewcomments.${commentIndex}`]: 1}}
                                        );
    await connection.collection('books').updateOne(
                                            {"_id": ObjectId(bookId)}, 
                                            {$pull: {"reviewcomments": null}}
                                        );
}
    // Check the request charge for the previous operation
    //Check if using Mongo Atlas
    if (db.getIsCosmos()) {
        connection.command({ getLastRequestStatistics: 1 }, function(err, result) {
        assert.strictEqual(err, null);
        const requestCharge = result['RequestCharge'];
        console.log("Request charge for removeComment was: ", requestCharge);
    });
    }   
export default removeComment
export {removeComment}