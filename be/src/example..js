const postCounts = {
    '1': { name: '1', postCount: 12 },
    '2': { name: '2', postCount: 8 },
    '3': { name: '3', postCount: 11 },
    '4': { name: '4', postCount: 10 },
    '5': { name: '5', postCount: 16 },
    '6': { name: '6', postCount: 7 },
    '7': { name: '7', postCount: 14 },
    '8': { name: '8', postCount: 17 },
    '9': { name: '9', postCount: 4 },
    '10': { name: '10', postCount: 9 },
    '11': { name: '11', postCount: 7 },
    '12': { name: '12', postCount: 16 },
    '13': { name: '13', postCount: 8 },
    '14': { name: '14', postCount: 13 },
    '15': { name: '15', postCount: 8 },
    '16': { name: '16', postCount: 10 },
    '17': { name: '17', postCount: 12 },
    '18': { name: '18', postCount: 9 },
    '19': { name: '19', postCount: 16 },
    '20': { name: '20', postCount: 17 }
};

const topUsers = Object.values(postCounts)
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);

console.log(topUsers);