import {
	ResolverFn,
	Resolver,
	ResolverWithResolve,
	Scalars,
	TypeResolveFn
} from './generated-types/graphql';

// Flatten Resolver to function for consistent handling later
type FlattenResolverToFunction<T> = T extends ResolverFn<any, any, any, any>
	? (...args: Parameters<T>) => ReturnType<T>
	: T extends ResolverWithResolve<any, any, any, any>
	? (...args: Parameters<T['resolve']>) => ReturnType<T['resolve']>
	: null;

/**
 * Use to extract a resolver function signature from a resolver
 * @param TResolver - a resolver type generated from Graphql Codegen
 *
 * output type will conform to:
 * @func (root, args, context, info) => result | Promise(result)
 */
export type ResolverSignature<TResolver> = TResolver extends Resolver<any, any, any, any>
	? Exclude<FlattenResolverToFunction<TResolver>, undefined>
	: never;

// export type ServiceInputType<T> = Omit<T, "_id"> & { _id?: Scalars["ID"] };

// Get keys for given type as union
type ExtractPropertyKeys<T> = {
	[K in keyof T]: K;
}[keyof T];

// Strip out 'istypeOf' and undefined from resolver
type ResolverKeys<T> = Exclude<ExtractPropertyKeys<T>, 'isTypeOf' | undefined>;

// Get stripped list of resolvers
type ResolversList<T> = {
	[K in ResolverKeys<T>]: Exclude<T[K], undefined>;
};

// Flatten resolver - used of resolver is an object with a 'resolve' property
type ExtractResolverFn<T> = T extends ResolverWithResolve<any, any, any, any> ? T['resolve'] : T;

// Get type with all resolvers, with 'isTypeOf' and undefined stripped
type AllResolversForType<T> = {
	[K in keyof ResolversList<T>]: ExtractResolverFn<ResolversList<T>[K]>;
};

// Get first generic param of Resolver, which is the expected return type
type ExtractFirstGenericParam<T extends Resolver<any, any, any, any>> = T extends Resolver<
	infer U,
	any,
	any,
	any
>
	? U
	: unknown;

// Get type properties mapped to return type wrappers
type MapResolversToTypeWrappers<T> = {
	[K in keyof T]: T[K] extends Resolver<any, any, any, any>
		? NonNullable<ExtractFirstGenericParam<T[K]>>
		: never;
};

// Map type wrappers to solid types
type MapTypeWrappersTotypes<T> = {
	[K in keyof T]: T[K] extends (infer U)[] ? Awaited<U>[] : Awaited<T[K]>;
};

// Map resolvers to solid types
type MapResolverstoTypes<T> = MapTypeWrappersTotypes<MapResolversToTypeWrappers<T>>;

// Outputs an type with a collection of properties mapped by name to resolver return types
type MapAllResolversToTypes<T> = MapResolverstoTypes<AllResolversForType<T>>;

// Union of scalar types, omitting "_Fieldset"
type FilterdScalars = Scalars[keyof Omit<Scalars, '_FieldSet'>];

// Outputs type that only includes resolvers with a non-scalar return type
type FilterMappedResolversToNonScalars<T> = {
	[K in keyof MapAllResolversToTypes<T> as MapAllResolversToTypes<T>[K] extends FilterdScalars
		? never
		: K]: MapAllResolversToTypes<T>[K];
};

// outputs a union of strings representing required resolver keys
type RequiredResolverKeys<T> = keyof FilterMappedResolversToNonScalars<T>;

/**
 * Given
 * @param TResolversCollection as a generic argument, will return a type including only resolvers for non-scalar types
 *
 * All properties will be required
 */
export type RequiredResolvers<TResolversCollection> = Required<{
	[K in keyof TResolversCollection as K extends RequiredResolverKeys<TResolversCollection>
		? K
		: never]: TResolversCollection[K];
}>;

/**
 * Given
 * @param TResolversCollection as a generic argument, will return a type including only resolvers for scalar types
 *
 * All properties will be optional
 */
export type OptionalResolvers<TResolversCollection> = {
	[K in keyof TResolversCollection as K extends RequiredResolverKeys<TResolversCollection>
		? never
		: K]: TResolversCollection[K];
};

/**
 * Given
 * @param TResolversCollection as a generic argument, will return a type including all resolvers for both scalar and non-scalar types EXCEPT FOR 'isTypeOf'
 *
 * Properties that map to non-scalar resolvers will be required
 * All other properties will be optional
 */
export type EntityResolvers<TResolversCollection> = RequiredResolvers<TResolversCollection> &
	OptionalResolvers<TResolversCollection> &
	UnionResolvers<TResolversCollection>;

export type UnionResolvers<T> = {
	[K in keyof Required<T> as Required<T>[K] extends TypeResolveFn<any, any, any>
		? K extends 'resolveType'
			? `__${K}`
			: never
		: never]: Required<T>[K];
};
