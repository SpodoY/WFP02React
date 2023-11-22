export const queryCandidates = async (contractObject) => {

    const candidateAmount = await contractObject.candidateCount();

    // Needed since umm... useState shenanigangs
    let buffer = Array();

    // Adds all candidates to buffer
    for (let i = 1; i <= candidateAmount; i++) {
      buffer.push(await contractObject.candidates(i));
    }

    return buffer;

}