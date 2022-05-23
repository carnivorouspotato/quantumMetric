"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { expect } = require("chai");
const supertest_1 = require("supertest");
describe('POST Query For All Countries & Data', () => {
    it('should assert Vatican City objects', async() => {
          await (0, supertest_1.agent)('https://graphql.country')
              .post('/graphql')
              .send({
              query: '{ countries(alpha2Code: "VA"){ edges { node { name nativeName alpha2Code alpha3Code  capital }}}}'
          })
              .expect(200)
              .then((res) => {
                  const responseBody = res.body.data.countries.edges[0].node
                  expect(responseBody.name).to.equal('Holy See')
                  expect(responseBody.nativeName).to.equal('Sancta Sedes')
                  expect(responseBody.alpha2Code).to.equal('VA')
                  expect(responseBody.alpha3Code).to.equal('VAT')
          });
          
      });
    it('should return all countries that speak english', async () => {
        await (0, supertest_1.agent)('https://graphql.country')
            .post('/graphql')
            .send({
                query: '{languages(iso6391 : "en"){edges{node{name countrySet{edges{node{name}}}}}}}'
            })
            .expect(200)
            .then((res) => {
                const responseBody = res.body.data.languages.edges[0].node.countrySet.edges

                const thatSpkEng = responseBody.map(cnty => {
                    return cnty.node.name
                })
                const compareEnglish = responseBody.map(cnty => {
                    return cnty.node.name
                })
               for (let i = 0; i < thatSpkEng.length; i++) {
                    expect(thatSpkEng[i]).to.equal(compareEnglish[i])
                }
            });
    });
    it('should return all countries that use euro currency', async () => {
        await (0, supertest_1.agent)('https://graphql.country')
            .post('/graphql')
            .send({
                query: '{currencies(code: "EUR"){edges{node{name countrySet{edges{ node{name languages { edges{ node{ nativeName}}}}}}}}}}'
            })
            .expect(200)
            .then((res) => {
                const responseBody = res.body.data.currencies.edges[0].node.countrySet.edges

                const thatSpkEng = responseBody.map(cnty => {
                    return cnty.node.name
                })


                function lngFunction(cnty) {
                    (0, supertest_1.agent)('https://graphql.country')
                        .post('/graphql')
                        .send({
                            query: `'{currencies(code: "EUR"){edges{node{name countrySet(name: "${cnty}" ){edges{ node{name languages { edges{ node{ nativeName}}}}}}}}}}'`
                        })
                        .expect(200)
                        .then((res) => {
                            const responseBody = res.body.data.currencies.edges[0].node.countrySet.edges
                            return responseBody[0].node.languages
                        });

                }

                for (const element of thatSpkEng) {
                    lngFunction(element)
                }


            });
    });
});