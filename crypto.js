//CReating a key
const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt'])
//Vector
const iv = crypto.getRandomValues(new Uint8Array(16))

//Text to ArrayBuffer
const enc = new TextEncoder('utf-8')
const plainTextByes = enc.encode('Sexo Sexual')

//Encrypt plain text
const encrypt = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, plainTextByes)

//Decode encrypted text
const dec = new TextDecoder('utf-8')
dec.decode(encrypt)

//Decrypted 
const decrypt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypt)

//Exporte key 
const exportedKey = await crypto.subtle.exportKey('raw', key)
//String
dec.decode(exportedKey)


//Password derivations
const enc = new TextEncoder('utf-8')
const phrase = 'La vaca loca'
const salt = 'Salt to  make this even more secure'
const saltBytes = enc.encode(salt)
const iterations = 1000000
const phraseBytes = enc.encode(phrase)
const baseKey = await crypto.subtle.importKey('raw', phraseBytes, { name: 'PBKDF2' }, false, ['deriveKey'])
const direvedKey = await crypto.subtle.deriveKey({ name: "PBKDF2", salt: saltBytes, iterations: iterations, hash: "SHA-1" }, baseKey, { name: 'AES-GCM', length: 256 }, false, ["encrypt", "decrypt"])

const plainTextByes = enc.encode('Sexo Sexual')
const iv = crypto.getRandomValues(new Uint8Array(16))
const encrypt = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, direvedKey, plainTextByes)
const blob = new Blob([iv, new Uint8Array(encrypt)], { type: "application/octet-stream" })
let fileReader = new FileReader();
fileReader.readAsArrayBuffer(blob)
let arrayBufferNew
let uint8ArrayNew
fileReader.onload = function (event) {
    arrayBufferNew = event.target.result;
    uint8ArrayNew = new Uint8Array(arrayBufferNew)
}
const ivBytes2 = new Uint8Array(uint8ArrayNew.slice(0, 16))
const cypher = new Uint8Array(uint8ArrayNew.slice(16))
const decrypt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBytes2 }, direvedKey, cypher)
const dec8 = new TextDecoder('utf-8')
dec8.decode(decrypt)