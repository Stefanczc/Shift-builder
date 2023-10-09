class Shift {
    
    constructor(shiftName, date, startTime, endTime, hourlyWage, workplace) {
        this.shiftName = shiftName;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hourlyWage = hourlyWage;
        this.workplace = workplace;
        this.profit = this.calculateProfit();
    }

    calculateProfit() {
        const startTime = new Date(this.date + ' ' + this.startTime);
        const endTime = new Date(this.date + ' ' + this.endTime);

        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const timeDifference = endTime - startTime;
        const hoursWorked = timeDifference / (1000 * 60 * 60);
        return parseInt(hoursWorked * this.hourlyWage);
    }

}

export { Shift };