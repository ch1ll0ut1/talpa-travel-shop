import { MigrationInterface, QueryRunner } from "typeorm";
import { Product } from "../entity/Product.js";

export class Init1725717915169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const date1 = '2022-01-01';
        const date2 = '2022-02-03';
        const date3 = '2022-03-05';

        const products = [
            {
                name: "Flight to Paris",
                category: "flight",
                date: date1,
                price: 100,
                location: 'Paris',
                description: 'Flight to Barcelona with a layover in Paris',
                image: 'https://loremflickr.com/200/200?random=1',
            },
            {
                name: "Flight to London",
                category: "flight",
                date: date2,
                price: 100,
                location: 'London',
                description: 'Direct flight to London',
                image: 'https://loremflickr.com/200/200?random=2',
            },
            {
                name: "Flight to New York",
                category: "flight",
                date: date1,
                price: 100,
                location: 'New York',
                description: 'Flight to New York with a layover in Paris',
                image: 'https://loremflickr.com/200/200?random=3',
            },
            {
                name: "Hotel in Paris",
                category: "hotel",
                date: date1,
                price: 250,
                location: 'Paris',
                description: 'Luxury hotel in the heart of Paris',
                image: 'https://loremflickr.com/200/200?random=4',
            },
            {
                name: "Hotel in London",
                category: "hotel",
                date: date2,
                price: 250,
                location: 'London',
                description: 'Cozy hotel in London city center',
                image: 'https://loremflickr.com/200/200?random=5',
            },
            {
                name: "Hotel in New York",
                category: "hotel",
                date: date3,
                price: 250,
                location: 'New York',
                description: 'Modern hotel near Times Square',
                image: 'https://loremflickr.com/200/200?random=6',
            },
            {
                name: "Car in Paris",
                category: "car",
                date: date1,
                price: 500,
                location: 'Paris',
                description: 'Luxury car rental in Paris',
                image: 'https://loremflickr.com/200/200?random=7',
            },
            {
                name: "Car in London",
                category: "car",
                date: date2,
                price: 500,
                location: 'London',
                description: 'Premium car rental in London',
                image: 'https://loremflickr.com/200/200?random=8',
            },
            {
                name: "Car in New York",
                category: "car",
                date: date3,
                price: 500,
                location: 'New York',
                description: 'SUV rental in New York',
                image: 'https://loremflickr.com/200/200?random=9',
            },
        ];

        await queryRunner.manager.getRepository(Product).save(products);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
