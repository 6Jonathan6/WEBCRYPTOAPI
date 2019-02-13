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