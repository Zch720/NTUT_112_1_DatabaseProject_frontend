import { describe, test, expect } from '@jest/globals'

describe('operation sample', () => {
    test('1 + 1 should be 2', () => {
        expect(1 + 1).toBe(2);
    });

    test('1 + 1 should not be 3', () => {
        expect(1 + 1).not.toBe(3);
    });

    test('1 - 1 should be 0', () => {
        expect(1 - 1).toBe(0);
    });

    test('1 - 1 should not be 1', () => {
        expect(1 - 1).not.toBe(1);
    });

    test('1 * 1 should be 1', () => {
        expect(1 * 1).toBe(1);
    });

    test('1 * 1 should not be 2', () => {
        expect(1 * 1).not.toBe(2);
    });

    test('1 / 1 should be 1', () => {
        expect(1 / 1).toBe(1);
    });

    test('1 / 1 should not be 2', () => {
        expect(1 / 1).not.toBe(2);
    });
});