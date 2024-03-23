import axiosInstanceServer from '@/helpers/axiosConfigServer';

export class getQuestions {
  private static readonly API_BASE = '/questions';

  public static getQuestions = async () => {
    const { data } = await axiosInstanceServer().get(`${this.API_BASE}`);
    return data;
  };
}
