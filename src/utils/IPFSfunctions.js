import ipfs from "ipfs";

/**
 * @author Jufg
 * @function SettingsPage
 */

export const IPFSfetchData = async (hash) => {
    const node = await ipfs.create()

    const stream = node.cat(hash)
    let data = '';

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }

    return data;
}

export const IPFSaddData = async (data0) => {
    const node = await ipfs.create()

    const data = 'Hello, Jufg'

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
    const results = node.add(data)

// we loop over the results because 'add' supports multiple
// additions, but we only added one entry here so we only see
// one log line in the output
    for await (const { cid } of results) {
        // CID (Content IDentifier) uniquely addresses the data
        // and can be used to get it again.
        console.log(cid.toString())
    }
}
