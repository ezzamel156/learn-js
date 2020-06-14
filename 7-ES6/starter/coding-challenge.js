/**
 * Location
 * 1) Property
 *      - name
 *      - build year
 * 2) Method
 *      - getAge
 *      - getName
 * 
 * Park property
 * 1) Property
 *      - tree count
 *      - area
 * 2) Method
 *      - getTreeDensity
 * 
 * Street
 * - length
 * - size (tiny/small/normal:default/big/huge)
 * 
 */

class Location {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Location {
    constructor(name, buildYear, treeCount, area) {
        super(name, buildYear);
        this.treeCount = treeCount;
        this.area = area;
    }
    treeDensity() {
        return this.treeCount / this.area;
    }
    printTreeDensity() {
        return `${this.name} has a tree density of ${this.treeDensity()} per square km`;
    }
}

class Street extends Location {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const size = new Map();
        size.set(1, 'tiny');
        size.set(2, 'small');
        size.set(3, 'normal');
        size.set(4, 'big');
        size.set(5, 'huge');
        return size.get(this.size);
    }

    printClassifyStreet() {
        return `${this.name} is classified as a ${this.classifyStreet()} street`
    }
}

function average(array) {
    return sum(array) / array.length;
}

function sum(array) {
    return array.reduce((accumulator, value) => accumulator + value);
}

function printPeport(parks, streets) {
    // 1. Tree density of each park in the town (forumla: number of trees/park area)
    parks.forEach((park) => console.log(park.printTreeDensity()))

    // 2. Average age of each town's park (forumla: sum of all ages/number of parks)
    const averageAge = average(parks.map(park => new Date().getFullYear() - park.buildYear));
    console.log(`The average age of each town's parks (${parks.length}) is ${averageAge} years old`);
    
    // 3. The name of the park that has more than 1000 trees
    // for (const park of parks) {
    //     if(park.treeCount > 1000) {
    //         console.log(`${park.name} has more than 1000 trees`);
    //     }
    // }
    const parkWith1000Trees = parks.find(park => park.treeCount > 1000);
    console.log(`${parkWith1000Trees.name} has more than 1000 trees`);

    // 4. Total and average length of the town's streets
    const streetLengths = streets.map(street => street.length);
    const totalLength = sum(streetLengths);
    const averageLength = average(streetLengths);
    console.log(`The town ${streets.length} streets have a combined total of ${totalLength} km and an average of ${averageLength}`);
    
    // 5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
    streets.forEach(street => {
        console.log(street.printClassifyStreet());
    });
}

const allParks = [new Park('Green Park', 1987, 215, 0.2),
                 new Park('National Park', 1894, 3541, 2.9),
                 new Park('Oak Park', 1953,949, 0.4)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

printPeport(allParks, allStreets);

