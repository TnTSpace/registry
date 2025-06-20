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

	import * as Table from '../table';
	import { Button } from '../button';
	import { Input } from '../input';
	import { onMount } from 'svelte';
	import { ChevronDownIcon, ChevronRightIcon, PlusIcon, Trash2Icon } from 'lucide-svelte';
	import { cn } from '../../../utils/index';
	import { camelToNormalCase } from '../../../fxns/index';
	import { removeRingClasses } from '@toolsntuts/utils';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		filteredRows?: TData[];
		selectedRows?: TData[];
		shouldSelectRow?: boolean;
		flatten?: (data: any) => any;
		ondelete?: (selected: any[]) => void;
	};

	let {
		data = $bindable([]),
		selectedRows = $bindable([]),
		filteredRows = $bindable([]),
		shouldSelectRow = $bindable(false),
		columns,
		flatten = (data: any[]) => data,
		ondelete
	}: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 5 });
	let sorting = $state<SortingState>([]);
	let globalFilter = $state('');
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let rowId = $state('');
	let bp = $state<Breakpoint>('xs');
	let mounted = $state(false);

	filteredRows = [...data];

	const firstData = (data as any[])[0];
	const columnKeys = firstData ? Object.keys(firstData) : [];

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
			console.log({ search });
			return columnKeys.some((key) => {
				const value = (row.original as Record<string, unknown>)[key];
				const condition = value?.toString?.().toLowerCase?.().includes(search);
				return condition;
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
			filteredRows = table.getFilteredRowModel().rows.map((row) => row.original);
		},
		onColumnVisibilityChange: (updater) => {
			columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater;
		},
		onRowSelectionChange: (updater) => {
			rowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
			selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
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
		mounted = true;
	};

	const hideColumns = (bp: Breakpoint) => {
		const columns = table.getAllColumns();
		const total = columns.length;

		// Always show first, second, and last columns
		const baseVisibleIndices = [0, 1, total - 3, total - 2, total - 1];

		// Breakpoint-based progressive reveals (up to total - 2 to avoid last column duplication)
		const progressiveReveals = {
			sm: 1,
			md: 2,
			lg: 3,
			xl: 4,
			'2xl': total - 3 // Reveal all except first, second, and last
		} as Record<Breakpoint, number>;

		// Determine how many additional columns to show (beyond the always-visible ones)
		let additionalVisible: number[] = [];
		if (total > 3 && bp !== 'xs') {
			const extraCount = Math.min(progressiveReveals[bp], total - 3);
			// Pick indices starting from 2 (after second column), excluding last
			additionalVisible = Array.from({ length: extraCount }, (_, i) => i + 2).filter(
				(i) => i < total - 1
			);
		}

		const visibleIndices = new Set([...baseVisibleIndices, ...additionalVisible]);

		columns.forEach((col, i) => {
			col.toggleVisibility(visibleIndices.has(i));
		});
	};

	onMount(() => {
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	});

	const selectRow = (id: string) => (rowId = rowId === id ? '' : id);

	const isSelected = (id: string) => id === rowId;

	const handleDeleteProducts = async () => {
		ondelete?.(selectedRows);
		selectedRows = [];
		table.toggleAllRowsSelected(false);
	};
</script>

{#if mounted}
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 items-center  gap-4 py-4">
			<div class="flex items-center gap-2">
				<Button variant="outline" class="rounded-full">
					<PlusIcon class="size-4" />
					<span>Add</span>
				</Button>
				{#if selectedRows.length}
					<Button variant="outline" class="rounded-full" onclick={handleDeleteProducts}>
						<Trash2Icon class="size-4" />
						<span>Delete</span>
					</Button>
				{/if}
			</div>
			<Input placeholder="Filter columns..." {oninput} {onchange} class={cn("md:ml-auto max-w-80", removeRingClasses())} />
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
								{:else if i === 0}
									<Table.Head class="items-center gap-1">
										{#if !header.isPlaceholder}
											<div class="flex size-10 items-center justify-center">
												<FlexRender
													content={header.column.columnDef.header}
													context={header.getContext()}
												/>
											</div>
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
						{@const original = flatten(row.original)}
						{@const keys = Object.keys(original as any)}
						<Table.Row class="relative align-middle" data-state={row.getIsSelected() && 'selected'}>
							{#each row.getVisibleCells() as cell, i}
								{#if i === 0}
									<Table.Cell class="w-10">
										<div class="flex size-full flex-col items-center gap-2">
											<FlexRender
												content={cell.column.columnDef.cell}
												context={cell.getContext()}
											/>
											<Button size="icon" variant="ghost" onclick={() => selectRow(row.id)}>
												{#if isSelected(row.id)}
													<ChevronDownIcon class="size-4" />
												{:else}
													<ChevronRightIcon class="size-4" />
												{/if}
											</Button>
										</div>
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
						<tr class={cn('hidden', isSelected(row.id) && 'table-row')}>
							<td colspan="4">
								{#each keys as key, i}
									{#if key !== 'xata_id' && key !== 'country' && key !== ''}
										<div class="flex h-10 items-center gap-4 border-b p-2">
											<div class="whitespace-nowrap font-bold">
												{camelToNormalCase(key)}
											</div>
											<div class="line-clamp-1">
												{original[key]}
											</div>
										</div>
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
{/if}
