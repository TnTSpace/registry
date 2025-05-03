<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type PaginationState,
		type SortingState,
		type VisibilityState,
		type RowSelectionState,
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel
	} from '@tanstack/table-core';

	import { createSvelteTable, FlexRender } from './index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	import * as Table from '$lib/components/ui/table';
	import { Button } from '../button';
	import { Input } from '../input';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';
	import { ChevronDownIcon, ChevronRightIcon } from 'lucide-svelte';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 5 });
	let sorting = $state<SortingState>([]);
	let globalFilter = $state('');
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let rowId = $state('');
	let bp = $state<Breakpoint>('xs');

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: (row, columnId, filterValue) => {
			const search = filterValue?.toLowerCase?.() ?? '';

			return ['email', 'status', 'amount'].some((key) => {
				const value = (row.original as Record<string, unknown>)[key];
				return value?.toString?.().toLowerCase?.().includes(search);
			});
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onGlobalFilterChange: (updater) => {
			globalFilter = typeof updater === 'function' ? updater(globalFilter) : updater;
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
		},
		onRowSelectionChange: (updater) => {
			rowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
		},
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get globalFilter() {
				return globalFilter;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			}
		}
	});

	const oninput = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		table.setGlobalFilter(target.value);
	};

	const onchange = oninput;

	const breakpoints = {
		xs: 0,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		'2xl': 1536
	};

	type Breakpoint = keyof typeof breakpoints;

	const getBreakpoint = (width: number): Breakpoint => {
		if (width >= breakpoints['2xl']) return '2xl';
		if (width >= breakpoints['xl']) return 'xl';
		if (width >= breakpoints['lg']) return 'lg';
		if (width >= breakpoints['md']) return 'md';
		if (width >= breakpoints['sm']) return 'sm';
		return 'xs';
	};

	const handleResize = () => {
		const width = window.innerWidth;
		bp = getBreakpoint(width);
		hideColumns(bp);
	};

	const hideColumns = (bp: Breakpoint) => {
		const columns = table.getAllColumns();
		switch (bp) {
			case '2xl':
				columns.forEach((column) => column.toggleVisibility(true));
				break;
			case 'xl':
				columns.forEach((column) => column.toggleVisibility(true));
				break;
			case 'lg':
				columns.forEach((column) => column.toggleVisibility(true));
				break;
			case 'md':
				columns.forEach((column) => column.toggleVisibility(true));
				break;
			case 'sm':
				columns.forEach((column, i) => {
					const untouchableIndices = [0, 1, 2, columns.length - 1];
					const fxn = column.toggleVisibility;
					untouchableIndices.includes(i) ? fxn(true) : fxn(false);
				});
				break;
			case 'xs':
				columns.forEach((column, i) => {
					const untouchableIndices = [0, 1, columns.length - 1];
					const fxn = column.toggleVisibility;
					untouchableIndices.includes(i) ? fxn(true) : fxn(false);
				});
				break;

			default:
				break;
		}
	};

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	const selectRow = (id: string) => (rowId = rowId === id ? '' : id);

	const isSelected = (id: string) => id === rowId;

	const columnKeys = columns.map((col) => col?.id ?? (col as Record<string, any>)['accessorKey']);

  console.log({ columnKeys })
</script>

<div>
	<div class="flex items-center gap-4 py-4">
		<Input
			placeholder="Filter emails..."
			value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
			{oninput}
			{onchange}
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ml-auto">Columns</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{#each table.getAllColumns().filter((col) => col.getCanHide()) as column (column.id)}
					<DropdownMenu.CheckboxItem
						class="capitalize"
						bind:checked={() => column.getIsVisible(), (v) => column.toggleVisibility(!!v)}
					>
						{column.id}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header, i}
							{#if i === headerGroup.headers.length - 1}
								<Table.Head class="justify-end text-right">
									{#if !header.isPlaceholder}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
								</Table.Head>
							{:else}
								<Table.Head>
									{#if !header.isPlaceholder}
										<FlexRender
											content={header.column.columnDef.header}
											context={header.getContext()}
										/>
									{/if}
								</Table.Head>
							{/if}
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					{@const original = row.original as Record<string, any>}
					{@const keys = Object.keys(original as any)}
					<Table.Row class="relative" data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell, i}
							{#if i === 0}
								<Table.Cell class="flex items-center">
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
									<Button
										size="icon"
										variant="ghost"
										onclick={() => selectRow(row.id)}
										class="md:hidden"
									>
										{#if isSelected(row.id)}
											<ChevronDownIcon class="size-4" />
										{:else}
											<ChevronRightIcon class="size-4" />
										{/if}
									</Button>
								</Table.Cell>
							{:else if i === row.getVisibleCells().length - 1}
								<Table.Cell class="justify-end text-right">
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</Table.Cell>
							{:else}
								<Table.Cell>
									<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
								</Table.Cell>
							{/if}
						{/each}
					</Table.Row>
					<tr class={cn('hidden', isSelected(row.id) && 'table-row', 'lg:hidden')}>
						<td colspan="3">
							{#each keys as key, i}
								{#if bp === 'xs'}
									{#if key !== columnKeys[1]}
										<div class="flex h-10 items-center gap-4 border-b p-2">
											<div class="font-bold">
												{key}
											</div>
											<div>
												{original[key]}
											</div>
										</div>
									{/if}
								{:else if bp === 'sm'}
									{#if key !== columnKeys[1] && key !== columnKeys[2]}
										<div class="flex h-10 items-center gap-4 border-b p-2">
											<div class="font-bold">
												{key}
											</div>
											<div>
												{original[key]}
											</div>
										</div>
									{/if}
								{/if}
							{/each}
						</td>
					</tr>
				{:else}
					<Table.Row>
						<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2 py-4 text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length} of{' '}
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
		<div class="flex items-center gap-2 py-4">
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</Button>
		</div>
	</div>
</div>
