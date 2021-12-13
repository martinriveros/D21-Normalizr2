module.exports = (normalizedData, denormalizedData) => {

    let normalizedLength = JSON.stringify(normalizedData).length
    let denormalizedLength = JSON.stringify(denormalizedData).length
    
    return (normalizedLength-denormalizedLength)/denormalizedLength*100
}