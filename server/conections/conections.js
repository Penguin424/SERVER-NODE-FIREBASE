const admin = require('firebase-admin');


const getPublicUrl = (filename, token) => 
{
    return `https://firebasestorage.googleapis.com/v0/b/portafolio-c8c78.appspot.com/o/${filename}?alt=media&token=${token}`
}

const uploadFile = (req, res, next, token,gcsname) =>
{
    const storage = admin.storage()
    const bucket = storage.bucket();
    

    if (!req.file) {
        return next();
    }

    
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                resource: {type: 'global'},      
                metadata:
                {
                    firebaseStorageDownloadTokens: token,
                }
            },
            resumable: false
        });
    
      stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
      });
    
      stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
          req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
          next();
        });
    });
    
    stream.end(req.file.buffer);
}

const dbCreateCard = (data) => 
{
    let db = admin.database();
    db.ref('cartas').push(data);
}



module.exports = {getPublicUrl, uploadFile, dbCreateCard};