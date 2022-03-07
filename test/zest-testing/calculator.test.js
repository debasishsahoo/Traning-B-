const mathOperations = require('./calculator');

describe('Calculator tests', () => {
    test('adding 1+2 should return 3', () => {
        //Arange & Acting
        const result = mathOperations.sum(1, 2)
        //assert
        expect(result).toBe(3);
    });
    test('Subtracting 2 from 10 should rerurn 8', () => {
        //Arange & Acting
        const result = mathOperations.diff(10, 2)
        //assert
        expect(result).toBe(8);
    });
    test('Multiplying 2 and 8 Should return 16', () => {
        //Arange & Acting
        const result = mathOperations.product(2, 8)
        //assert
        expect(result).toBe(16);
    });

    //!EQUALITY
    test("Equality Match", () => {
        expect(2 * 2).toBe(4);      //x===y
        expect(4 - 2).not.toBe(1);   //x!==y
    });

    //!TRUTHINESS
    test("Truthy Operators", () => {
        const name = "Software Testing Help";
        const n = null;

        expect(n).toBeNull()     //true
        expect(name).not.toBeNull()  //true

        //Name has a Valid Value
        expect(name).toBeTruthy() //true

        //Fail -> as null is non Sucess
        expect(n).toBeTruthy() //False

        //Pass -> as null treated as False or Negative
        expect(n).toBeFalsy()   //true

        //0 ->Treated as Flase
        expect(0).toBeFalsy()   //true

    });

    //! Number Match
    test("Numeric Operators", () => {
        const x = 100;
        const y = -200;
        const z = 0;

        //Greater Then 
        expect(x).toBeGreaterThan(10);
        expect(y).toBeLessThan(10);

        //less then or Equal
        expect(y).toBeLessThanOrEqual(0);
        //Greator then or Equal
        expect(z).toBeGreaterThanOrEqual(0);
    });

    //!String Matchers
    test("String Matches", () => {
        const String1 = "Mir Loves MIRDA -- a great Love Story by MirIjazurRahaman"

        expect(String1).toMatch(/Mir/);
        expect(String1).not.toMatch(/abc/);
    });






})