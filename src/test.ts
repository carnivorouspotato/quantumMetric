import { agent as request } from 'supertest';

describe('POST Query For All Countries & Data', () => {
  it('should respond with all country data from the country API', () => {
    request('https://graphql.country')
      .post('/graphql')
      .send({
        query:
          '{ countries { edges { node { name topLevelDomain alpha2Code alpha3Code callingCodes capital altSpellings region subregion population latLng demonym area gini timezones borders nativeName numericCode currencies { edges { node { name code symbol }}} languages { edges { node { name nativeName iso6391 iso6392 }}} translations flag regionalBlocs { edges { node { name acronym otherNames otherAcronyms }}} cioc }}}}'
      })
      .expect(200)
      .then((res) => {
        console.log(res.text);
      });
  });
});
