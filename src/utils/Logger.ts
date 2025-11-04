export class Logger {
    private static date = new Date().toISOString();

    private static colors = {
        reset: '\x1b[0m',
        blue: '\x1b[34m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
        magenta: '\x1b[35m',
    };

    private static format(message: string, place?: string) {
        const isPlace = place ? `${this.colors.magenta}${place}: ${this.colors.reset}` : '';

        return `${isPlace}${message} \n----------------------------------\n`;
    }

    public static info(message: string, place?: string) {
        console.log(`\n${this.colors.blue}[INFO]: ${this.date}${this.colors.reset}: ${this.format(message, place)}`);
    }

    public static success(message: string, place?: string) {
        console.log(`\n${this.colors.green}[SUCCESS]: ${this.date}${this.colors.reset}: ${this.format(message, place)}`);
    }

    public static warn(message: string, place?: string) {
        console.warn(`\n${this.colors.yellow}[WARN]: ${this.date}${this.colors.reset}: ${this.format(message, place)}`);
    }

    public static error(message: string, place?: string) {
        console.error(`\n${this.colors.red}[ERROR]: ${this.date}${this.colors.reset}: ${this.format(message, place)}`);
    }
}
