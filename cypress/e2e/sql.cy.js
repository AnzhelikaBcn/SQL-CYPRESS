describe("connect to test db", () => {
    it("can connect to the db", () => {
        cy.task("queryDb", `
        CREATE TABLE Students (
          StudentID int,
          FirstName varchar(255),
          StudentGroup varchar(255),
          City varchar(255)
        )
      `);
    });

    it('Input entries', () => {
        cy.task("queryDb",
            `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
            (1, "Ivan", "02-2022", "Barcelona"),
            (2, "Maria", "03-2022", "Tokio"),
            (3, "Andrey", "02-2023", "Milan");`
        ).then((result) => {
            cy.log(JSON.stringify(result));
            expect(result.affectedRows).to.equal(3);
        });
    });

    it('select', () => {
        cy.task("queryDb", `SELECT FirstName FROM Students WHERE City="Milan"`)
            .then((result) => {
                cy.log(JSON.stringify(result));
                expect(result[0].FirstName).to.equal("Andrey");
            });
    });

        it('Add 2 more students to an existing group', () => {
          cy.task("queryDb",
            `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
              (4, "Olga", "02-2022", "Kiev"),
              (5, "Pavel", "02-2022", "Amsterdam");`
          ).then((result) => {
            cy.log(JSON.stringify(result));
            expect(result.affectedRows).to.equal(2);
          });
        });
      
        it('Select all students from a specific group', () => {
          cy.task("queryDb", `SELECT FirstName FROM Students WHERE StudentGroup="02-2022"`)
            .then((result) => {
              cy.log(JSON.stringify(result));
              
            });
        });

    it("can delete the db", () => {
        cy.task("queryDb",
            `DROP TABLE Students`);
    });
});

