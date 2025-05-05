export class urlHelper {
    public static readonly STORAGE_KEY = 'cityKey';
    private static readonly API_KEY = '865883edefdd6071452769ba0e318cc5';
    private static readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    

    public static  buildUrl(cityName: string): string {
        return `${this.BASE_URL}?q=${cityName}&appid=${this.API_KEY}&units=metric`;
    }
}