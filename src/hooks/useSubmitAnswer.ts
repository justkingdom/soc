import { IAnswerParams, fetchAnswer } from "../apis/answer";

export function useSubmitAnswer() {

  const onSubmit = async (opKey: string, questionId: string) => {
    console.log('opKey: ', opKey);
    console.log('questionId: ', questionId);
    debugger
    const params = {
      opKey,
      questionId,
      operationType: 'option',
      reason: '',
    } as IAnswerParams;
    const result = await fetchAnswer(params);
    console.log('result: ', result);
  }

  return {
    onSubmit
  };
}
