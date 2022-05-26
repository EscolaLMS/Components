import * as React from "react";
import type { Category } from "@escolalms/sdk/lib/types/api";
import { useTranslation } from "react-i18next";

interface CategoryTreeOptionsProps {
  categories: Category[];
  id?: number;
  labelPrefix?: string;
}

const CategoryTreeOptions: React.FC<CategoryTreeOptionsProps> = ({
  categories,
  id,
  labelPrefix,
}) => {
  return (
    <React.Fragment>
      {categories
        // .filter((category) => category.count && category.count > 1)
        .map((category: Category) => (
          <React.Fragment key={category.id}>
            <option value={category.id} selected={Number(id) === category.id}>
              {labelPrefix ? `${labelPrefix}${category.name}` : category.name}
            </option>
            {category &&
              category.subcategories &&
              category.subcategories.length > 0 && (
                <CategoryTreeOptions
                  labelPrefix={
                    labelPrefix
                      ? `${labelPrefix}${category.name} > `
                      : `${category.name} > `
                  }
                  categories={category.subcategories}
                  id={id}
                />
              )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

interface CategoriesProps {
  categories: Category[];
  onChange: (value: string) => void;
  id?: number;
}

export const Categories: React.FC<CategoriesProps> = (props) => {
  const { categories, id, onChange } = props;
  const { t } = useTranslation();

  return (
    <div className="select-box">
      <select
        className="form-control"
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      >
        <option value="" selected={!!id}>
          {t("All Categories")}
        </option>
        <CategoryTreeOptions categories={categories} id={id} />
      </select>
    </div>
  );
};
