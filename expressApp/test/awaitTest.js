const fetch = require('node-fetch');

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout)
});

async function getZhihuColumn(id) {
    await sleep(2000);
    const url = `https://zhuanlan.zhihu.com/api/columns/${id}`;
    const response = await fetch(url);
    return await response.json()
}

const showColumnInfo = async (id) => {
    console.time('showColumnInfo');
    const [qianduanzhidian, FrontendMagazine] = await Promise.all([
        getZhihuColumn('qianduanzhidian'),
        getZhihuColumn('FrontendMagazine')
    ]);

    console.log(`name:${qianduanzhidian.name}`)
    console.log(`description:${qianduanzhidian.description}`)

    console.log(`name:${FrontendMagazine.name}`)
    console.log(`description:${FrontendMagazine.description}`)

    console.timeEnd('showColumnInfo')
};

showColumnInfo(); // 2630.869ms