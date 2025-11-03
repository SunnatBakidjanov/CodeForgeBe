export class Logger {
    private static date = new Date().toISOString();

    private static colors = {
        reset: '\x1b[0m',
        blue: '\x1b[34m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        red: '\x1b[31m',
    };

    private static format(message: string) {
        return `${message} \n----------------------------------\n`;
    }

    public static info(message: string) {
        console.log(`\n${this.colors.blue}[INFO]: ${this.date}${this.colors.reset}: ${this.format(message)}`);
    }

    public static success(message: string) {
        console.log(`\n${this.colors.green}[SUCCESS]: ${this.date}${this.colors.reset}: ${this.format(message)}`);
    }

    public static warn(message: string) {
        console.warn(`\n${this.colors.yellow}[WARN]: ${this.date}${this.colors.reset}: ${this.format(message)}`);
    }

    public static error(message: string) {
        console.error(`\n${this.colors.red}[ERROR]: ${this.date}${this.colors.reset}: ${this.format(message)}`);
    }
}
