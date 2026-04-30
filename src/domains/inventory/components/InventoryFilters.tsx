import { Input } from '@/shared/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/shared/ui/select'
import { Search } from 'lucide-react'
import type { Category } from '../hooks/useCategories'
import type { Season } from '../hooks/useSeasons'

interface Props {
    search: string
    categoryId: string | null
    seasonId: string | null
    categories: Category[]
    seasons: Season[]
    onSearchChange: (v: string) => void
    onCategoryChange: (v: string | null) => void
    onSeasonChange: (v: string | null) => void
}

export function InventoryFilters({
    search, categoryId, seasonId,
    categories, seasons,
    onSearchChange, onCategoryChange, onSeasonChange,
}: Props) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative w-full sm:flex-1 sm:min-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 w-full"
                />
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
                <Select
                    value={categoryId ?? 'all'}
                    onValueChange={(v) => onCategoryChange(v === 'all' ? null : v)}
                >
                    <SelectTrigger className="flex-1 min-w-0 sm:w-[175px]">
                        <span className="truncate block">
                            {categoryId
                                ? categories.find((c) => c.id === categoryId)?.name ?? 'Categoría'
                                : 'Todas las categorías'}
                        </span>
                    </SelectTrigger>
                    <SelectContent position="popper" side="bottom" sideOffset={4}>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.icon} {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={seasonId ?? 'all'}
                    onValueChange={(v) => onSeasonChange(v === 'all' ? null : v)}
                >
                    <SelectTrigger className="flex-1 min-w-0 sm:w-[175px]">
                        <span className="truncate block">
                            {seasonId
                                ? seasons.find((s) => s.id === seasonId)?.name ?? 'Temporada'
                                : 'Todas las temporadas'}
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas las temporadas</SelectItem>
                        {seasons.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                                {s.icon} {s.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}