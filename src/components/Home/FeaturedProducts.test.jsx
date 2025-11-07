import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'jotai';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import FeaturedProducts from './FeaturedProducts';
import { vi } from 'vitest';

vi.mock('axios');

describe('FeaturedProducts', () => {
  it('renders the heading and a list of products', async () => {
    const products = [
      { id: 1, name: 'Product 1', price: 10, image_urls: [''] },
      { id: 2, name: 'Product 2', price: 20, image_urls: [''] },
    ];
    axios.get.mockResolvedValue({ data: products });

    await act(async () => {
      render(
        <Provider>
          <MemoryRouter>
            <FeaturedProducts />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(screen.getByText(/Exclusivo/i)).toBeInTheDocument();
    expect(screen.getByText(/Colombia/i)).toBeInTheDocument();

    const product1 = await screen.findByText('Product 1');
    const product2 = await screen.findByText('Product 2');

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});
