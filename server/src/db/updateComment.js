import  db  from './db.js';
import obj from 'mongodb';
import assert from 'assert';

const {ObjectId} = obj;


const updateComment = async (bookId, name, comment) => {
    const connection = db.getConnection();
    // Append comment to the reviewcomments array field of a book
    await connection.collection('books').updateOne(
                                            {"_id": ObjectId(bookId)}, 
                                            {$push: {reviewcomments: {"name": name,
                                                                      "comment": comment }
                                                                    }})
    // Check the request charge for the previous operation
    //Check if using Mongo Atlas
    if (db.getIsCosmos()) {
      connection.command({ getLastRequestStatistics: 1 }, function(err, result) {
      assert.strictEqual(err, null);
      const requestCharge = result['RequestCharge'];
      console.log("Request charge for updateComment was: ", requestCharge);
    });
  }    
}
export default updateComment
export {updateComment}