import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const TableHeader = ({ sortConfig, handleSort }) => {
  return (
    <thead>
      <tr className="bg-black bg-opacity-75 text-white">
        <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
          Nombre
          {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
        </th>
        <th className="p-2">Subtítulo</th>
        <th className="p-2 cursor-pointer" onClick={() => handleSort('price')}>
          Precio
          {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
        </th>
        <th className="p-2 cursor-pointer" onClick={() => handleSort('category')}>
          Categoría
          {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="h-4 w-4 inline" /> : <ChevronDownIcon className="h-4 w-4 inline" />)}
        </th>
        <th className="p-2 col-span-2">Colores</th>
        <th className="p-2">Imágenes</th>
        <th className="p-2">Tallas</th>
        <th className="p-2">Inventario</th>
        <th className="p-2">¿Tiene Tallas?</th>
        <th className="p-2">¿Tiene Colores?</th>
        <th className="p-2">Acciones</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
